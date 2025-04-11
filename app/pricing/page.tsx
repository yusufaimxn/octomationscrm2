"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

export default function PricingPage() {
  const [loading, setLoading] = useState(true)
  const [updatingPlan, setUpdatingPlan] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [currentPlan, setCurrentPlan] = useState<string>("starter")
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Fetch user data and current plan
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true)

        // Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Error fetching session:", sessionError)
          return
        }

        if (!session) {
          // User is not logged in
          setUser(null)
          setLoading(false)
          return
        }

        // Get user data including current plan
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, email, plan")
          .eq("id", session.user.id)
          .single()

        if (userError) {
          console.error("Error fetching user data:", userError)
          setUser(session.user)
          setCurrentPlan("starter") // Default to starter if error
        } else {
          setUser(userData)
          setCurrentPlan(userData.plan || "starter")
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [supabase])

  // Handle plan upgrade
  const handleUpgrade = async (plan: string) => {
    // If user is not logged in, redirect to login
    if (!user) {
      toast.error("Please login to upgrade your plan", {
        description: "You'll need an account to continue.",
        duration: 5000,
      })
      router.push("/login")
      return
    }

    // If already on this plan, show info toast
    if (currentPlan === plan) {
      toast.info("You're already on this plan", {
        description: "No changes were made to your subscription.",
      })
      return
    }

    try {
      setUpdatingPlan(plan)

      // Update user plan in Supabase
      const { error } = await supabase.from("users").update({ plan }).eq("id", user.id)

      if (error) {
        throw error
      }

      // Show success toast
      toast.success(`Upgraded to ${plan} plan!`, {
        description: "Your subscription has been updated successfully.",
      })

      // Update local state
      setCurrentPlan(plan)

      // Redirect to billing page
      setTimeout(() => {
        router.push("/dashboard/settings/billing")
      }, 1500)
    } catch (error) {
      console.error("Error upgrading plan:", error)
      toast.error("Failed to upgrade plan", {
        description: "Please try again or contact support.",
      })
    } finally {
      setUpdatingPlan(null)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0c0c0c] text-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#e63327]" />
        <span className="ml-2 text-lg">Loading pricing plans...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Select the perfect plan for your business needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Card className="bg-zinc-900 border-zinc-800 text-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/20 hover:border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription className="text-gray-400">Perfect for individuals and small businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-4xl font-bold">
                  $0<span className="text-lg font-normal text-gray-400">/month</span>
                </p>
                <p className="text-sm text-gray-400">Free forever</p>
              </div>
              <ul className="space-y-3 mb-6">
                <PricingFeature included>1 User</PricingFeature>
                <PricingFeature included>Basic CRM Features</PricingFeature>
                <PricingFeature included>WhatsApp Channel Only</PricingFeature>
                <PricingFeature included>5 Clients</PricingFeature>
                <PricingFeature>Multiple Channels</PricingFeature>
                <PricingFeature>Automations</PricingFeature>
                <PricingFeature>Priority Support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={cn(
                  "w-full border border-[#e63327] text-[#e63327] hover:bg-[#e63327]/10 font-medium rounded-full px-4 py-2 transition-all duration-200",
                  currentPlan === "starter" && "bg-[#e63327]/10",
                )}
                variant="outline"
                onClick={() => handleUpgrade("starter")}
                disabled={updatingPlan !== null || currentPlan === "starter"}
              >
                {updatingPlan === "starter" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : currentPlan === "starter" ? (
                  "Current Plan"
                ) : (
                  "Downgrade"
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-zinc-900 border-zinc-800 text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#e63327]/20 hover:border-zinc-700 ring-2 ring-[#e63327] relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#e63327] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription className="text-gray-400">Ideal for growing teams and businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-4xl font-bold">
                  $29<span className="text-lg font-normal text-gray-400">/month</span>
                </p>
                <p className="text-sm text-gray-400">Billed monthly</p>
              </div>
              <ul className="space-y-3 mb-6">
                <PricingFeature included>3 Users</PricingFeature>
                <PricingFeature included>Full CRM Suite</PricingFeature>
                <PricingFeature included>All Channels Enabled</PricingFeature>
                <PricingFeature included>Unlimited Clients</PricingFeature>
                <PricingFeature included>10 Automations</PricingFeature>
                <PricingFeature included>Priority Support</PricingFeature>
                <PricingFeature>Custom Integrations</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-[#e63327] hover:bg-[#d12d22] text-white font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => handleUpgrade("pro")}
                disabled={updatingPlan !== null || currentPlan === "pro"}
              >
                {updatingPlan === "pro" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : currentPlan === "pro" ? (
                  "Current Plan"
                ) : (
                  "Upgrade Now"
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-zinc-900 border-zinc-800 text-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/20 hover:border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription className="text-gray-400">Custom solutions for large organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-4xl font-bold">Custom</p>
                <p className="text-sm text-gray-400">Tailored to your needs</p>
              </div>
              <ul className="space-y-3 mb-6">
                <PricingFeature included>Unlimited Users</PricingFeature>
                <PricingFeature included>Full CRM Suite</PricingFeature>
                <PricingFeature included>All Channels Enabled</PricingFeature>
                <PricingFeature included>Unlimited Clients</PricingFeature>
                <PricingFeature included>Unlimited Automations</PricingFeature>
                <PricingFeature included>Dedicated Account Manager</PricingFeature>
                <PricingFeature included>Custom Integrations</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full border border-[#e63327] text-[#e63327] hover:bg-[#e63327]/10 font-medium rounded-full px-4 py-2 transition-all duration-200"
                variant="outline"
                onClick={() => handleUpgrade("enterprise")}
                disabled={updatingPlan !== null || currentPlan === "enterprise"}
              >
                {updatingPlan === "enterprise" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : currentPlan === "enterprise" ? (
                  "Current Plan"
                ) : (
                  "Contact Sales"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FaqItem
              question="Can I upgrade or downgrade my plan anytime?"
              answer="Yes, you can change your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply to your next billing cycle."
            />
            <FaqItem
              question="Is there a free trial for paid plans?"
              answer="Yes, we offer a 14-day free trial for our Pro plan. No credit card required to start your trial."
            />
            <FaqItem
              question="What payment methods do you accept?"
              answer="We accept major credit cards, PayPal, and bank transfers for annual plans."
            />
            <FaqItem
              question="Do you offer discounts for non-profits?"
              answer="Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingFeature({ children, included = false }: { children: React.ReactNode; included?: boolean }) {
  return (
    <li className="flex items-center">
      {included ? (
        <Check className="h-5 w-5 text-[#2be0bc] mr-2 flex-shrink-0" />
      ) : (
        <X className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
      )}
      <span className={cn("text-sm", !included && "text-gray-500")}>{children}</span>
    </li>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-zinc-800/50 p-6 rounded-xl">
      <h3 className="font-medium text-lg mb-2">{question}</h3>
      <p className="text-gray-400 text-sm">{answer}</p>
    </div>
  )
}
