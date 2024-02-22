package functions

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
)

type OpenAIClient struct {
	APIKey     string
	BaseURL    string
	HTTPClient *http.Client
}

func NewOpenAIClient() *OpenAIClient {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatal("API key not set in OPENAI_API_KEY environment variable")
	}
	return &OpenAIClient{
		APIKey:     apiKey,
		BaseURL:    "https://api.openai.com/v1",
		HTTPClient: &http.Client{},
	}
}

type ChatCompletionResponse struct {
	ID                string   `json:"id"`
	Object            string   `json:"object"`
	Created           int64    `json:"created"`
	Model             string   `json:"model"`
	SystemFingerprint string   `json:"system_fingerprint"`
	Choices           []Choice `json:"choices"`
	Usage             Usage    `json:"usage"`
}

type Choice struct {
	Index        int              `json:"index"`
	Message      Message          `json:"message"`
	Logprobs     *json.RawMessage `json:"logprobs"` // Use *json.RawMessage for raw or null JSON
	FinishReason string           `json:"finish_reason"`
}

type Usage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}

func (c *OpenAIClient) RequestChatCompletion(req []byte) (res []byte, err error) {
	data := map[string]any{
		"model": "gpt-3.5-turbo",
		"messages": []Message{
			{Role: "system", Content: string(req)},
		},
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return res, err
	}
	r, err := http.NewRequest("POST", c.BaseURL+"/chat/completions", bytes.NewBuffer(jsonData))
	if err != nil {
		return res, err
	}

	r.Header.Add("Authorization", "Bearer "+c.APIKey)
	r.Header.Set("Content-Type", "application/json")
	resp, err := c.HTTPClient.Do(r)

	if err != nil {
		return res, err
	}

	defer resp.Body.Close()

	return io.ReadAll(resp.Body)
}
