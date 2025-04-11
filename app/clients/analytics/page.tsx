"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Users,
  UserCheck,
  BarChart3,
  MessageSquare,
  Calendar,
  Download,
  Filter,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Bot,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ClientAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Analytics</h1>
          <p className="text-muted-foreground">Track your client engagement and conversion metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="30d" className="w-[300px]" onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7d">Last 7 days</TabsTrigger>
              <TabsTrigger value="30d">Last 30 days</TabsTrigger>
              <TabsTrigger value="90d">Last 90 days</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" className="rounded-lg">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-lg">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </div>

      {/* Section 1: Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Clients"
          value="248"
          change="+12"
          period="this week"
          trend="up"
          icon={<Users className="h-5 w-5" />}
        />
        <OverviewCard
          title="Active Clients"
          value="186"
          change="+8"
          period="this week"
          trend="up"
          icon={<UserCheck className="h-5 w-5" />}
        />
        <OverviewCard
          title="Conversion Rate"
          value="34.7%"
          change="-2.1%"
          period="vs last period"
          trend="down"
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <OverviewCard
          title="WhatsApp Engagement"
          value="68.3%"
          change="+8.7%"
          period="vs last period"
          trend="up"
          icon={<MessageSquare className="h-5 w-5" />}
        />
      </div>

      {/* Section 2: Conversion Funnel */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full py-6">
            <ConversionFunnel />
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout for Engagement Graph and Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 3: Engagement Graph */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Client Engagement</CardTitle>
            <Button variant="outline" size="sm" className="h-8 rounded-lg">
              <Calendar className="h-3.5 w-3.5 mr-2" />
              Custom Range
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center bg-muted/30 rounded-xl border border-dashed">
              <div className="text-center">
                <BarChart3 className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Engagement Chart Placeholder</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Data shown for{" "}
                  {timeRange === "7d" ? "last 7 days" : timeRange === "30d" ? "last 30 days" : "last 90 days"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Channel Breakdown */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Channel Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Donut Chart Placeholder */}
              <div className="w-[200px] h-[200px] relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-8 border-[#2be0bc] opacity-20"></div>
                <div className="absolute inset-[15%] rounded-full border-8 border-blue-500 opacity-20"></div>
                <div className="absolute inset-[30%] rounded-full border-8 border-yellow-500 opacity-20"></div>
                <div className="absolute inset-[45%] rounded-full border-8 border-red-500 opacity-20"></div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Chart</p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-3">
                <ChannelLegendItem color="#2be0bc" label="WhatsApp" percentage="45%" />
                <ChannelLegendItem color="rgb(59, 130, 246)" label="Email" percentage="30%" />
                <ChannelLegendItem color="rgb(234, 179, 8)" label="Referral" percentage="15%" />
                <ChannelLegendItem color="rgb(239, 68, 68)" label="Organic" percentage="10%" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 5: AI Suggestion Box */}
      <Card className="rounded-2xl shadow-sm border-[#2be0bc]/30 bg-[#2be0bc]/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-[#2be0bc]/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-[#2be0bc]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">AI Insights</h2>
              <p className="text-sm text-muted-foreground">Powered by OctoBrain</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm">
                <span className="font-medium text-[#2be0bc]">Insight:</span> Your WhatsApp campaigns have a 45% higher
                response rate than email campaigns. Consider shifting more of your communication to WhatsApp.
              </p>
            </div>

            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm">
                <span className="font-medium text-[#2be0bc]">Opportunity:</span> 24 clients haven't been contacted in
                over 30 days. Consider setting up an automated re-engagement campaign.
              </p>
            </div>

            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm">
                <span className="font-medium text-[#2be0bc]">Suggestion:</span> Your conversion rate from Lead to
                Customer has decreased by 2.1%. Review your follow-up process to identify potential improvements.
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" className="rounded-lg border-[#2be0bc]/50 text-[#2be0bc] hover:bg-[#2be0bc]/10">
              <Lightbulb className="h-4 w-4 mr-2" />
              Get More Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OverviewCard({
  title,
  value,
  change,
  period,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  period: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}) {
  return (
    <Card className="rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
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
          <span className="text-xs text-muted-foreground ml-1">{period}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ConversionFunnel() {
  // Mock data for the funnel
  const funnelData = [
    { stage: "Prospect", count: 248, percentage: 100 },
    { stage: "Lead", count: 186, percentage: 75 },
    { stage: "Customer", count: 112, percentage: 45 },
    { stage: "Repeat", count: 86, percentage: 35 },
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
              className="h-16 rounded-xl flex items-center justify-between px-4"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: "rgba(43, 224, 188, 0.2)",
                borderLeft: "4px solid #2be0bc",
              }}
            >
              <div>
                <span className="font-medium">{item.stage}</span>
                <div className="text-sm text-muted-foreground">{item.count} clients</div>
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
          Conversion rate from Prospect to Repeat Customer: <span className="font-medium text-foreground">35%</span>
        </p>
        <p>
          Biggest drop: <span className="font-medium text-foreground">Lead to Customer (30%)</span>
        </p>
      </div>
    </div>
  )
}

function ChannelLegendItem({ color, label, percentage }: { color: string; label: string; percentage: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }}></div>
      <div className="flex-1">{label}</div>
      <div className="font-medium">{percentage}</div>
    </div>
  )
}
