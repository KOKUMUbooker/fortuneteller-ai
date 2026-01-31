import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskBadge } from "@/components/risk-badge"
import { toTwoDecimalPlaces } from "@/lib/utils";

export interface PricingResult {
  recommendedPrice: number
  suggestedRange: { min: number; max: number }
  riskLevel: "low" | "medium" | "high"
  profitScenarios: Array<{
    price: number
    profitPerUnit: number
    marginPercent: number
    marketPosition: string
  }>
  riskExplanation: string
  riskFactors: string[]
  confidenceNote: string
}

interface ResultCardProps {
  result: PricingResult
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Recommended Price</span>
          <RiskBadge level={result.riskLevel} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-5xl font-bold text-primary">
            KES {toTwoDecimalPlaces(result.recommendedPrice).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Suggested range: KES {toTwoDecimalPlaces(result.suggestedRange.min)?.toLocaleString()} - KES{" "}
            {toTwoDecimalPlaces(result.suggestedRange.max).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
