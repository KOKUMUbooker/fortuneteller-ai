import { Header } from "@/components/header"
import { FooterDisclaimer } from "@/components/footer-disclaimer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react"

const scenarios = [
  {
    title: "Low Margin Challenge",
    description: "A bakery with high ingredient costs trying to stay competitive",
    badge: "Budget Business",
    badgeVariant: "secondary" as const,
    icon: TrendingDown,
    inputs: {
      unitCost: 8.5,
      desiredMargin: 20,
      competitorMin: 10.0,
      competitorMax: 15.0,
    },
    expectation:
      "Shows how to balance tight margins while staying competitive in the market",
  },
  {
    title: "Premium Positioning",
    description: "A handmade jewelry maker with unique products",
    badge: "Artisan Business",
    badgeVariant: "default" as const,
    icon: TrendingUp,
    inputs: {
      unitCost: 25.0,
      desiredMargin: 60,
      competitorMin: 40.0,
      competitorMax: 80.0,
    },
    expectation:
      "Demonstrates premium pricing strategy for differentiated products",
  },
  {
    title: "Tight Competition",
    description: "A soap maker in a saturated local market",
    badge: "Competitive Market",
    badgeVariant: "outline" as const,
    icon: Minus,
    inputs: {
      unitCost: 3.0,
      desiredMargin: 40,
      competitorMin: 4.5,
      competitorMax: 6.0,
    },
    expectation:
      "Reveals strategies for differentiating in a crowded market with narrow price bands",
  },
]

export default function DemoGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Demo Guide
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Try these example scenarios to explore how FortuneTeller AI analyzes pricing
          </p>

          {/* Quick Start */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Use these sample inputs to see how the pricing advisor works
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    1
                  </span>
                  Go to the Pricing Advisor page
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    2
                  </span>
                  Enter the values from any scenario below
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    3
                  </span>
                  Click &quot;Analyze Pricing&quot; to see the results
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    4
                  </span>
                  Review the recommended price, scenarios table, and risk analysis
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Example Scenarios */}
          <h2 className="mt-12 text-xl font-semibold text-foreground">
            Example Scenarios
          </h2>
          <div className="mt-6 grid gap-6">
            {scenarios.map((scenario, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <scenario.icon className="h-5 w-5 text-primary" />
                      {scenario.title}
                    </CardTitle>
                    <Badge variant={scenario.badgeVariant}>{scenario.badge}</Badge>
                  </div>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <h4 className="mb-3 text-sm font-medium text-foreground">
                        Input Values
                      </h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Unit Cost:</dt>
                          <dd className="font-medium text-foreground">
                            ${scenario.inputs.unitCost.toFixed(2)}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Desired Margin:</dt>
                          <dd className="font-medium text-foreground">
                            {scenario.inputs.desiredMargin}%
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Competitor Min:</dt>
                          <dd className="font-medium text-foreground">
                            ${scenario.inputs.competitorMin.toFixed(2)}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Competitor Max:</dt>
                          <dd className="font-medium text-foreground">
                            ${scenario.inputs.competitorMax.toFixed(2)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ArrowRight className="h-4 w-4" />
                        <span className="text-sm font-medium">What to expect:</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {scenario.expectation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tips for Exploring</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Try adjusting the margin slider to see how it affects the recommended price and risk level",
                  "Narrow the competitor price range to simulate a more competitive market",
                  "Increase unit costs while keeping competitor prices fixed to see margin pressure scenarios",
                  "Compare the profit scenarios table across different inputs to understand trade-offs",
                ].map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <FooterDisclaimer />
    </div>
  )
}
