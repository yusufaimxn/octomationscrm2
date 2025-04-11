"use client"

import { useTheme } from "@/contexts/theme-context"

export function ConversionFunnel() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Mock data for the funnel
  const funnelData = [
    { stage: "Leads", count: 248, percentage: 100 },
    { stage: "Responded", count: 186, percentage: 75 },
    { stage: "Booked", count: 112, percentage: 45 },
    { stage: "Closed", count: 86, percentage: 35 },
  ]

  // Calculate the drop percentages
  const dropPercentages = funnelData.map((item, index) => {
    if (index === 0) return 0
    const prevPercentage = funnelData[index - 1].percentage
    return prevPercentage - item.percentage
  })

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="space-y-4">
        {funnelData.map((item, index) => (
          <div key={item.stage} className="relative">
            {/* Funnel stage */}
            <div
              className="h-16 rounded-lg flex items-center justify-between px-4"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: isDark ? "rgba(43, 224, 188, 0.2)" : "rgba(43, 224, 188, 0.3)",
                borderLeft: "4px solid #2be0bc",
              }}
            >
              <div>
                <span className="font-medium">{item.stage}</span>
                <div className="text-sm text-muted-foreground">{item.count} contacts</div>
              </div>
              <div className="text-xl font-bold">{item.percentage}%</div>
            </div>

            {/* Drop indicator */}
            {index > 0 && dropPercentages[index] > 0 && (
              <div className="absolute -top-3 right-0 flex items-center">
                <div
                  className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  style={{
                    right: `${(100 - item.percentage) / 2}%`,
                  }}
                >
                  -{dropPercentages[index]}%
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 text-sm text-muted-foreground">
        <p>
          Conversion rate from lead to client: <span className="font-medium text-foreground">35%</span>
        </p>
        <p>
          Biggest drop: <span className="font-medium text-foreground">Responded to Booked (30%)</span>
        </p>
      </div>
    </div>
  )
}
