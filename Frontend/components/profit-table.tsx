import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, toTwoDecimalPlaces } from "@/lib/utils"

interface ProfitScenario {
  price: number
  profitPerUnit: number
  marginPercent: number
  marketPosition: string
}

interface ProfitTableProps {
  scenarios: ProfitScenario[]
  recommendedPrice: number
}

export function ProfitTable({ scenarios, recommendedPrice }: ProfitTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Scenarios</CardTitle>
        <CardDescription>
          Compare different pricing options and their trade-offs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price</TableHead>
                <TableHead>Profit/Unit</TableHead>
                <TableHead>Margin %</TableHead>
                <TableHead>Market Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    scenario.price === recommendedPrice &&
                      "bg-primary/5 font-medium"
                  )}
                >
                  <TableCell className="font-medium">
                    KES {toTwoDecimalPlaces(scenario.price).toLocaleString()}
                    {scenario.price === recommendedPrice && (
                      <span className="ml-2 text-xs text-primary">Recommended</span>
                    )}
                  </TableCell>
                  <TableCell>KES {toTwoDecimalPlaces(scenario.profitPerUnit).toLocaleString()}</TableCell>
                  <TableCell>{scenario.marginPercent.toFixed(1)}%</TableCell>
                  <TableCell>
                    <span
                      className={cn("text-sm", {
                        "text-success": scenario.marketPosition === "Competitive",
                        "text-muted-foreground":
                          scenario.marketPosition === "Average",
                        "text-warning-foreground": scenario.marketPosition === "Premium",
                        "text-destructive":
                          scenario.marketPosition === "High Risk",
                      })}
                    >
                      {scenario.marketPosition}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
