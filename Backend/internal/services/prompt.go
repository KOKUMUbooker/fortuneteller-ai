package services

import (
	"fmt"
	"strings"
)

type PricingPromptInput struct {
	UnitCost           float64
	RecommendedPrice   float64
	CompetitorMinPrice float64
	CompetitorMaxPrice float64
	RiskLevel          string
	RiskFactors        []string
}

// BuildPricingExplanationPrompt generates a prompt strictly for explanation.
// The LLM must NOT calculate prices or make decisions.
func BuildPricingExplanationPrompt(input PricingPromptInput) string {
	riskFactors := "None"
	if len(input.RiskFactors) > 0 {
		riskFactors = strings.Join(input.RiskFactors, "; ")
	}

	return fmt.Sprintf(`
You are a pricing explanation assistant for small business owners.

IMPORTANT RULES:
- Do NOT calculate prices.
- Do NOT suggest alternative prices.
- ONLY explain the provided recommendation.
- Use simple, non-technical language.

Pricing Context:
- Unit cost: %.2f
- Recommended price: %.2f
- Competitor price range: %.2f – %.2f
- Risk level: %s
- Risk factors: %s

Your task:
Return EXACTLY two short sections.

FORMAT (must follow exactly):
Risk Explanation:
<one short paragraph explaining the risk>

Confidence Note:
<one short sentence about confidence or uncertainty>
`,
		input.UnitCost,
		input.RecommendedPrice,
		input.CompetitorMinPrice,
		input.CompetitorMaxPrice,
		input.RiskLevel,
		riskFactors,
	)
}
