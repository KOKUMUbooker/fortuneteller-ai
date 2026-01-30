"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PricingForm, type PricingInputs } from "@/components/pricing-form"
import { ResultCard, type PricingResult } from "@/components/result-card"
import { ProfitTable } from "@/components/profit-table"
import { ExplanationBox } from "@/components/explanation-box"
import { FooterDisclaimer } from "@/components/footer-disclaimer"
import { LoadingState } from "@/components/loading-state"
import { Badge } from "@/components/ui/badge"

function calculatePricingResult(inputs: PricingInputs): PricingResult {
  const { unitCost, desiredMargin, competitorMinPrice, competitorMaxPrice } = inputs

  // Calculate base recommended price from cost and margin
  const costBasedPrice = unitCost / (1 - desiredMargin / 100)

  // Calculate market midpoint
  const marketMidpoint = (competitorMinPrice + competitorMaxPrice) / 2

  // Blend cost-based and market-based pricing
  const recommendedPrice = (costBasedPrice * 0.6 + marketMidpoint * 0.4)

  // Determine suggested range
  const suggestedMin = Math.max(unitCost * 1.1, competitorMinPrice * 0.95)
  const suggestedMax = Math.min(costBasedPrice * 1.2, competitorMaxPrice * 1.05)

  // Calculate risk level
  let riskLevel: "low" | "medium" | "high"
  let riskExplanation: string
  const riskFactors: string[] = []

  if (recommendedPrice < competitorMinPrice * 0.9) {
    riskLevel = "high"
    riskExplanation =
      "Your recommended price is significantly below market rates, which may raise concerns about quality perception or indicate unsustainable margins."
    riskFactors.push("Price significantly below market average")
    riskFactors.push("May signal low quality to customers")
    riskFactors.push("Limited room for promotions or discounts")
  } else if (recommendedPrice > competitorMaxPrice * 1.1) {
    riskLevel = "high"
    riskExplanation =
      "This price is significantly above the market average, which may reduce demand unless your product has clear differentiation or premium positioning."
    riskFactors.push("Price above competitor maximum")
    riskFactors.push("Requires strong value proposition")
    riskFactors.push("May limit market reach")
  } else if (recommendedPrice > marketMidpoint) {
    riskLevel = "medium"
    riskExplanation =
      "Your price is positioned in the upper half of the market. This can work well if your product offers additional value or quality improvements."
    riskFactors.push("Above average market positioning")
    riskFactors.push("Requires clear differentiation")
  } else {
    riskLevel = "low"
    riskExplanation =
      "Your price is competitively positioned within the market range while maintaining healthy margins. This is a balanced approach suitable for most micro-businesses."
    riskFactors.push("Price within competitive range")
    riskFactors.push("Good profit margin maintained")
  }

  // Generate profit scenarios
  const scenarios = [
    {
      price: suggestedMin,
      profitPerUnit: suggestedMin - unitCost,
      marginPercent: ((suggestedMin - unitCost) / suggestedMin) * 100,
      marketPosition: "Competitive",
    },
    {
      price: recommendedPrice,
      profitPerUnit: recommendedPrice - unitCost,
      marginPercent: ((recommendedPrice - unitCost) / recommendedPrice) * 100,
      marketPosition: "Average",
    },
    {
      price: marketMidpoint,
      profitPerUnit: marketMidpoint - unitCost,
      marginPercent: ((marketMidpoint - unitCost) / marketMidpoint) * 100,
      marketPosition: "Average",
    },
    {
      price: suggestedMax,
      profitPerUnit: suggestedMax - unitCost,
      marginPercent: ((suggestedMax - unitCost) / suggestedMax) * 100,
      marketPosition: "Premium",
    },
  ]

  // Remove duplicate prices and sort
  const uniqueScenarios = scenarios
    .filter(
      (scenario, index, self) =>
        index === self.findIndex((s) => Math.abs(s.price - scenario.price) < 0.01)
    )
    .sort((a, b) => a.price - b.price)

  const confidenceNote =
    "This analysis is based on the data provided. Actual results may vary based on market conditions, customer perception, and other factors not captured in this model."

  return {
    recommendedPrice: Math.round(recommendedPrice * 100) / 100,
    suggestedRange: {
      min: Math.round(suggestedMin * 100) / 100,
      max: Math.round(suggestedMax * 100) / 100,
    },
    riskLevel,
    profitScenarios: uniqueScenarios.map((s) => ({
      ...s,
      price: Math.round(s.price * 100) / 100,
      profitPerUnit: Math.round(s.profitPerUnit * 100) / 100,
    })),
    riskExplanation,
    riskFactors,
    confidenceNote,
  }
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PricingResult | null>(null)

  const handleSubmit = (inputs: PricingInputs) => {
    setIsLoading(true)
    setResult(null)

    // Simulate API call delay
    setTimeout(() => {
      const calculatedResult = calculatePricingResult(inputs)
      setResult(calculatedResult)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-4">
              Economic Growth
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Smart, fair pricing for micro-businesses
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Get AI-powered pricing recommendations based on your costs and market data
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div>
              <PricingForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {isLoading && <LoadingState />}

              {!isLoading && !result && (
                <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Enter your pricing data
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Results will appear here after analysis
                    </p>
                  </div>
                </div>
              )}

              {!isLoading && result && <ResultCard result={result} />}
            </div>
          </div>

          {/* Full Width Results Section */}
          {!isLoading && result && (
            <div className="mt-8 space-y-6">
              <ProfitTable
                scenarios={result.profitScenarios}
                recommendedPrice={result.recommendedPrice}
              />
              <ExplanationBox
                explanation={result.riskExplanation}
                riskFactors={result.riskFactors}
                confidenceNote={result.confidenceNote}
              />
            </div>
          )}
        </div>
      </main>

      <FooterDisclaimer />
    </div>
  )
}
