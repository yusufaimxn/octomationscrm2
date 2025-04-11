"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-2 bg-[#2be0bc]/20 text-black border-[#2be0bc]">Starter Plan</Badge>
              <h3 className="text-2xl font-bold">
                RM0<span className="text-sm font-normal text-muted-foreground">/month</span>
              </h3>
              <p className="text-sm text-muted-foreground">Free forever</p>
            </div>
            <Button
              className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
              asChild
            >
              <Link href="/pricing">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Link>
            </Button>
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-2">Plan Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-[#2be0bc]" />
                <span>1 User</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-[#2be0bc]" />
                <span>Basic CRM</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-[#2be0bc]" />
                <span>Manual WhatsApp Trigger</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-[#2be0bc]" />
                <span>Limited Support</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods and billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">No payment method added</p>
              <p className="text-xs text-muted-foreground">Add a payment method when you upgrade to a paid plan</p>
            </div>
            <Button variant="outline" disabled>
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Download className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No billing history</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Your billing history will appear here once you upgrade to a paid plan and make your first payment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
