"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Activity, TrendingUp, Award, ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
  // Sample data for recent clients
  const [recentClients] = useState([
    { id: 1, name: "Sarah Johnson", company: "Innovate Tech", addedTime: "2 hours ago", avatar: "S" },
    { id: 2, name: "Michael Chen", company: "Global Solutions", addedTime: "Yesterday", avatar: "M" },
    { id: 3, name: "Emma Rodriguez", company: "Creative Designs", addedTime: "2 days ago", avatar: "E" },
    { id: 4, name: "David Kim", company: "Nexus Systems", addedTime: "3 days ago", avatar: "D" },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your marketing automation platform</p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                14%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                5%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5%</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                2.3%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Top Campaign</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Summer Sale</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-[#2be0bc] font-medium">45% conversion rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Clients */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Monthly campaign metrics and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 p-4">
              <div className="text-center">
                <BarChart className="h-12 w-12 mx-auto mb-4 text-[#2be0bc] opacity-50" />
                <p className="text-muted-foreground">Chart placeholder</p>
                <p className="text-xs text-muted-foreground mt-1">Campaign performance data will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Latest clients added to your CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center gap-4 p-2 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2be0bc]/10 flex items-center justify-center text-[#2be0bc] font-medium">
                    {client.avatar}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.addedTime}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{client.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Chart Area */}
      <Card className="shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Engagement Analytics</CardTitle>
          <CardDescription>Client engagement across different campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 p-4">
            <div className="text-center">
              <Activity className="h-12 w-12 mx-auto mb-4 text-[#2be0bc] opacity-50" />
              <p className="text-muted-foreground">Analytics placeholder</p>
              <p className="text-xs text-muted-foreground mt-1">Engagement data will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
