"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown, Mail, MessageSquare, GitBranch } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Campaign = {
  id: string
  name: string
  type: "Email" | "WhatsApp" | "Funnel"
  engagement: number
  conversions: number
  lastSent: string
}

export function TopCampaignsTable() {
  // Mock data for campaigns
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Promotion",
      type: "WhatsApp",
      engagement: 78.4,
      conversions: 42,
      lastSent: "2023-06-15",
    },
    {
      id: "2",
      name: "New Client Welcome",
      type: "Email",
      engagement: 65.2,
      conversions: 38,
      lastSent: "2023-06-18",
    },
    {
      id: "3",
      name: "Product Launch",
      type: "Funnel",
      engagement: 82.1,
      conversions: 56,
      lastSent: "2023-06-10",
    },
    {
      id: "4",
      name: "Follow-up Sequence",
      type: "WhatsApp",
      engagement: 71.5,
      conversions: 29,
      lastSent: "2023-06-20",
    },
    {
      id: "5",
      name: "Referral Program",
      type: "Email",
      engagement: 58.9,
      conversions: 24,
      lastSent: "2023-06-12",
    },
  ]

  const [sortBy, setSortBy] = useState<keyof Campaign>("conversions")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof Campaign) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("engagement")}
                  className="font-medium flex items-center gap-1 p-0 h-auto"
                >
                  Engagement
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("conversions")}
                  className="font-medium flex items-center gap-1 p-0 h-auto"
                >
                  Conversions
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("lastSent")}
                  className="font-medium flex items-center gap-1 p-0 h-auto"
                >
                  Last Sent
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.type === "WhatsApp" ? "default" : campaign.type === "Email" ? "secondary" : "outline"
                    }
                    className="flex w-fit items-center gap-1"
                  >
                    {campaign.type === "WhatsApp" && <MessageSquare className="h-3 w-3" />}
                    {campaign.type === "Email" && <Mail className="h-3 w-3" />}
                    {campaign.type === "Funnel" && <GitBranch className="h-3 w-3" />}
                    {campaign.type}
                  </Badge>
                </TableCell>
                <TableCell>{campaign.engagement}%</TableCell>
                <TableCell>{campaign.conversions}</TableCell>
                <TableCell>{new Date(campaign.lastSent).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Showing top {sortedCampaigns.length} campaigns by performance
      </div>
    </div>
  )
}
