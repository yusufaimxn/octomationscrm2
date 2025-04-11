"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { LeadGrowthChart } from "@/components/analytics/lead-growth-chart"
import { ConversionFunnel } from "@/components/analytics/conversion-funnel"
import { TopCampaignsTable } from "@/components/analytics/top-campaigns-table"
import { SummaryCard } from "@/components/analytics/summary-card"
import { cn } from "@/lib/utils"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false)
  const [feedbackType, setFeedbackType] = useState<"positive" | "negative" | null>(null)

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedbackGiven(true)
    setFeedbackType(type)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your performance and get insights to grow your business</p>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Leads"
          value="248"
          change="+12.5%"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          timeRange={timeRange}
        />
        <SummaryCard
          title="Active Clients"
          value="86"
          change="+5.2%"
          trend="up"
          icon={<UserCheck className="h-5 w-5" />}
          timeRange={timeRange}
        />
        <SummaryCard
          title="Conversion Rate"
          value="34.7%"
          change="-2.1%"
          trend="down"
          icon={<BarChart3 className="h-5 w-5" />}
          timeRange={timeRange}
        />
        <SummaryCard
          title="WhatsApp Engagement"
          value="68.3%"
          change="+8.7%"
          trend="up"
          icon={<MessageSquare className="h-5 w-5" />}
          timeRange={timeRange}
        />
      </div>

      {/* Lead Growth Chart */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Lead Growth</h2>
              <p className="text-sm text-muted-foreground">
                New leads per day over the last{" "}
                {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "3 months"}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <Button variant="outline" size="sm" className="h-8 rounded-lg">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                Custom Range
              </Button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <LeadGrowthChart timeRange={timeRange} />
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Conversion Funnel</h2>
            <div className="h-[350px]">
              <ConversionFunnel />
            </div>
          </CardContent>
        </Card>

        {/* AI Summary */}
        <Card className="rounded-xl shadow-sm border-[#2be0bc]/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-[#2be0bc]/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-[#2be0bc]"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">OctoBrain Insights</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium text-[#e63327]">Alert:</span> Your conversion rate has dropped by 2.1%
                  compared to last week. This might be related to the recent changes in your WhatsApp campaign
                  templates.
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium text-[#2be0bc]">Insight:</span> Your "Summer Promotion" campaign is
                  generating 34% more leads than your average campaign. Consider extending this campaign or creating
                  similar ones.
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium text-[#2be0bc]">Opportunity:</span> Tuesday and Wednesday show the
                  highest engagement rates. Consider scheduling your important campaigns on these days for better
                  results.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">Was this insight helpful?</p>
              <div className="flex gap-2">
                {!feedbackGiven ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("rounded-lg", feedbackType === "positive" && "bg-[#2be0bc]/10 border-[#2be0bc]/50")}
                      onClick={() => handleFeedback("positive")}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Yes, helpful
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("rounded-lg", feedbackType === "negative" && "bg-muted border-muted-foreground/50")}
                      onClick={() => handleFeedback("negative")}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Not helpful
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-[#2be0bc]">Thanks for your feedback!</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Campaigns */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">Top Performing Campaigns</h2>
          <TopCampaignsTable />
        </CardContent>
      </Card>

      {/* Suggestions Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Suggestions for Growth</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SuggestionCard
            title="Try a Weekend Promotion"
            description="Weekend promotions can increase engagement by up to 25%. Create a special weekend offer to boost conversions."
          />
          <SuggestionCard
            title="Add Lead Nurturing Emails"
            description="Only 27% of your leads receive follow-up emails. Set up an automated email sequence to nurture your leads."
          />
          <SuggestionCard
            title="Optimize WhatsApp Templates"
            description="Your templates with images have 40% higher click rates. Consider adding more visual elements to your messages."
          />
        </div>
      </div>
    </div>
  )
}

function SuggestionCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-8 w-8 rounded-full bg-[#2be0bc]/10 flex items-center justify-center shrink-0">
            <Lightbulb className="h-4 w-4 text-[#2be0bc]" />
          </div>
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
