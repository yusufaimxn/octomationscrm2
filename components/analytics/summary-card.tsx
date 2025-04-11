"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  timeRange: "7d" | "30d" | "90d"
}

export function SummaryCard({ title, value, change, trend, icon, timeRange }: SummaryCardProps) {
  return (
    <Card className="rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-[#2be0bc]/10 flex items-center justify-center">
            <div className="text-[#2be0bc]">{icon}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div
            className={cn(
              "text-xs font-medium flex items-center",
              trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
            )}
          >
            {trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {change}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            vs previous {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "quarter"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
