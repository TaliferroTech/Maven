package functions

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"

	"cloud.google.com/go/bigquery"
	"google.golang.org/api/option"
)

func NewBigQueryClient(ctx context.Context, projectId string, opts ...option.ClientOption) (conn *bigquery.Client, err error) {
	return bigquery.NewClient(ctx, projectId, opts...)
}

func processAIQuery(q []byte) (query string) {
	var data ChatCompletionResponse
	json.Unmarshal(q, &data)
	content := data.Choices[0].Message.Content
	parts := strings.Split(content, "\n")
	query = strings.Join(parts, " ")
	query = strings.Trim(query, "`")
	query = strings.Trim(query, "sql")
	query = strings.TrimSpace(query)
	return query
}

func getFields() (res []byte, err error) {
	cwd, _ := os.Getwd()
	filePath := filepath.Join(cwd, "serverless_function_source_code", "field_descriptions.json")
	if _, err := os.Stat("serverless_function_source_code"); os.IsNotExist(err) {
		filePath = filepath.Join(cwd, "field_descriptions.json")
	}
	log.Println("filepath:", filePath)
	file, err := os.Open(filePath)
	if err != nil {
		return res, err
	}
	defer file.Close()

	// Read the entire file content
	data, err := io.ReadAll(file)
	if err != nil {
		return res, err
	}

	var fields map[string]interface{}
	err = json.Unmarshal(data, &fields)
	if err != nil {
		return res, err
	}

	res, err = json.Marshal(fields)
	if err != nil {
		return res, err
	}

	return res, err
}
