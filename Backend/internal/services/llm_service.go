package services

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"
)

type ORClient struct {
	ApiKey string
}

type ORRequest struct {
	Model     string `json:"model"`
	Input     string `json:"input"`
	MaxTokens int    `json:"max_tokens"`
}

type ORResponse struct {
	Output string `json:"output"`
}

func NewORClient() *ORClient {
	return &ORClient{ApiKey: os.Getenv("OPENROUTER_API_KEY")}
}

func (c *ORClient) ExplainPricing(prompt string) (string, error) {
	reqBody := ORRequest{
		Model:     "mistral-7b-instruct",
		Input:     prompt,
		MaxTokens: 200,
	}
	body, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest(
		"POST",
		"https://openrouter.ai/api/v1/chat/completions",
		bytes.NewBuffer(body),
	)

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.ApiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result ORResponse
	json.NewDecoder(resp.Body).Decode(&result)
	return result.Output, nil
}
