package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
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
	return &ORClient{ApiKey: os.Getenv("GEMINI_API_KEY")}
}

func (c *ORClient) ExplainPricing(prompt string) (string, string, error) {
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
		return "", "", err
	}
	defer resp.Body.Close()

	var result ORResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", "", err
	}

	output := result.Output

	riskExplanation := extractBetween(
		output,
		"<<RISK_EXPLANATION>>",
		"<</RISK_EXPLANATION>>",
	)

	confidenceNote := extractBetween(
		output,
		"<<CONFIDENCE_NOTE>>",
		"<</CONFIDENCE_NOTE>>",
	)

	if riskExplanation == "" || confidenceNote == "" {
		return "", "", fmt.Errorf("invalid LLM response format")
	}

	return riskExplanation, confidenceNote, nil
}

func extractBetween(text, start, end string) string {
	s := strings.Index(text, start)
	e := strings.Index(text, end)
	if s == -1 || e == -1 || e <= s {
		return ""
	}
	return strings.TrimSpace(text[s+len(start) : e])
}
