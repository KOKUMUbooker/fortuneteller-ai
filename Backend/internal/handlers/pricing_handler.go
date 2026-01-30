package handlers

import (
	"net/http"

	"github.com/KOKUMUbooker/fortuneteller-ai/Backend/internal/models"
	"github.com/KOKUMUbooker/fortuneteller-ai/Backend/internal/services"
	"github.com/gin-gonic/gin"
)

func PriceRecommendingHandler(c *gin.Context) {
	var input models.PricingInputs

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Now you can access the fields
	unitCost := input.UnitCost
	desiredMargin := input.DesiredMargin
	competitorMin := input.CompetitorMinPrice
	competitorMax := input.CompetitorMaxPrice
	basePrice := services.CalculateBasePrice(unitCost, desiredMargin)

	min, max, err := services.CalculateSuggestedRange(basePrice, competitorMin, competitorMax)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	res := models.PricingResult{}
	recommendedPrice := services.CalculateRecommendedPrice(basePrice, competitorMin, competitorMax)
	risk := services.EvaluateRisk(services.RiskInput{UnitCost: unitCost, CompetitorMinPrice: competitorMin, CompetitorMaxPrice: competitorMax, RecommendedPrice: recommendedPrice})
	res.RecommendedPrice = recommendedPrice
	res.SuggestedRange = models.SuggestedRange{Min: min, Max: max}
	res.ProfitScenarios = services.GenerateProfitScenarios(unitCost, competitorMin, competitorMax, recommendedPrice)
	res.RiskLevel = risk.RiskLevel
	res.RiskFactors = risk.RiskFactors
	prompt := services.BuildPricingExplanationPrompt(services.PricingPromptInput{UnitCost: unitCost, RecommendedPrice: recommendedPrice, CompetitorMinPrice: competitorMin, CompetitorMaxPrice: competitorMax, RiskLevel: risk.RiskLevel, RiskFactors: risk.RiskFactors})

	orclient := services.NewORClient()
	riskExplanation, confidenceNote, err := orclient.ExplainPricing(prompt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	res.RiskExplanation = riskExplanation
	res.ConfidenceNote = confidenceNote

	// Return JSON response
	c.JSON(http.StatusOK, res)
}
