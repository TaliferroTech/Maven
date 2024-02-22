package functions

import (
	"bytes"
	"context"
	"encoding/json"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/bigquery"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

func init() {
	functions.HTTP("Query", query)
}

func processIncomingRequest(req io.ReadCloser) (r []byte, err error) {
	r, err = io.ReadAll(req)
	if err != nil {
		return r, err
	}
	return r, nil
}

const promptTemplate = `{{.UserQuery}}
convert the current query into a query to be read by BigQuery. The table ID is maven-inc-pa.maven_inc.compaigns. Submit only the BigQuery, nothing else.
here is a list of the relevant fields and descriptions:
{{.Fields}}
be sure to account for case-sensitivity by LOWERing all WHERE clauses.
If value == 'unknown' it is considered missing or null.
`

func generateDBQuery(inReq []byte) ([]byte, error) {
	fieldsJSON, err := getFields()
	if err != nil {
		return []byte{}, err
	}
	// Assuming fieldsJSON is a JSON representation of your fields and descriptions
	tmpl, err := template.New("prompt").Parse(promptTemplate)
	if err != nil {
		return []byte{}, err
	}

	fieldsStr := string(fieldsJSON)

	data := struct {
		UserQuery string
		Fields    string
	}{
		UserQuery: string(inReq),
		Fields:    fieldsStr,
	}

	var outReq bytes.Buffer
	if err := tmpl.Execute(&outReq, data); err != nil {
		return []byte{}, err
	}

	return outReq.Bytes(), nil
}

func query(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	req, err := processIncomingRequest(r.Body)
	if err != nil {
		log.Printf("error processing request:\n%+v\n", err)
		http.Error(w, "could not process request at this time", http.StatusInternalServerError)
		return
	}

	chatReq, err := generateDBQuery(req)
	if err != nil {
		log.Println("error generating chat request:\n", err)
		http.Error(w, "error generating request for AI processing", http.StatusInternalServerError)
		return
	}

	openai := NewOpenAIClient()
	chatRes, err := openai.RequestChatCompletion(chatReq)
	if err != nil {
		log.Println("error processing chat request:\n", err)
		http.Error(w, "error processing chat request", http.StatusInternalServerError)
		return
	}
	q := processAIQuery(chatRes)
	ctx := context.Background()
	_, isCloudFunction := os.LookupEnv("FUNCTION_TARGET")
	_, isCloudRun := os.LookupEnv("K_SERVICE")
	c, err := NewBigQueryClient(ctx, "maven-inc-pa")
	if !isCloudFunction || !isCloudRun {
		c, err = NewBigQueryClient(ctx, "maven-inc-pa", option.WithCredentialsFile("service-account.json"))
	}

	log.Println("query received:", q)

	if err != nil {
		log.Println("error starting BigQuery:\n", err)
		http.Error(w, "error starting BigQuery", http.StatusInternalServerError)
		return
	}
	qR := c.Query(q)

	it, err := qR.Read(ctx)
	if err != nil {
		log.Println("error reading query results:\n", err)
		http.Error(w, "error reading query results", http.StatusInternalServerError)
		return
	}

	var allResults []map[string]bigquery.Value
	for {
		var results map[string]bigquery.Value
		err := it.Next(&results)
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Println("error receiving query results:\n", err)
			http.Error(w, "error receiving query results", http.StatusInternalServerError)
			return
		}
		allResults = append(allResults, results)
	}

	sendResp := make(map[string]interface{})
	if allResults == nil {
		sendResp["result"] = struct{}{}
	} else {
		sendResp["result"] = allResults
	}
	jsonResp, err := json.Marshal(sendResp)
	if err != nil {
		http.Error(w, "error marshaling response:\n"+err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(jsonResp)
	if err != nil {
		http.Error(w, "error sending response:\n"+err.Error(), http.StatusInternalServerError)
		return
	}
}
