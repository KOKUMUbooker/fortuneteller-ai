import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ExplanationBoxProps {
  explanation: string
  riskFactors: string[]
  confidenceNote: string
}

export function ExplanationBox({
  explanation,
  riskFactors,
  confidenceNote,
}: ExplanationBoxProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground">{explanation}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Risk Factors:</h4>
          <ul className="space-y-1">
            {riskFactors.map((factor, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Confidence Note:</span> {confidenceNote}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
