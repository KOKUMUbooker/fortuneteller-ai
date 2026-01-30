import { cn } from "@/lib/utils"

type RiskLevel = "low" | "medium" | "high"

interface RiskBadgeProps {
  level: RiskLevel
  className?: string
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        {
          "bg-success/15 text-success": level === "low",
          "bg-warning/15 text-warning-foreground": level === "medium",
          "bg-destructive/15 text-destructive": level === "high",
        },
        className
      )}
    >
      {level === "low" && "Low Risk"}
      {level === "medium" && "Medium Risk"}
      {level === "high" && "High Risk"}
    </span>
  )
}
