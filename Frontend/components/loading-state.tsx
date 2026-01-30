import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm font-medium text-foreground">
          Analyzing pricing scenarios...
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Calculating optimal price points and risk factors
        </p>
      </CardContent>
    </Card>
  )
}
