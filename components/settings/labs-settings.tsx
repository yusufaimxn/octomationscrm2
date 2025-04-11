"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Beaker, Sparkles, MessageSquare, Send, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface BetaFeature {
  id: string
  name: string
  description: string
  enabled: boolean
  status: "alpha" | "beta" | "coming-soon"
}

export function LabsSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [betaEnrolled, setBetaEnrolled] = useState(false)

  // Sample beta features
  const [betaFeatures, setBetaFeatures] = useState<BetaFeature[]>([
    {
      id: "ai-assistant",
      name: "AI Assistant",
      description: "Get AI-powered suggestions and automation for your marketing campaigns",
      enabled: true,
      status: "beta",
    },
    {
      id: "advanced-analytics",
      name: "Advanced Analytics Dashboard",
      description: "Access detailed performance metrics and custom reports",
      enabled: false,
      status: "beta",
    },
    {
      id: "multi-channel",
      name: "Multi-Channel Campaigns",
      description: "Create and manage campaigns across email, SMS, and social media from a single interface",
      enabled: false,
      status: "alpha",
    },
    {
      id: "automation-builder",
      name: "Visual Automation Builder",
      description: "Drag-and-drop interface for creating complex marketing automation workflows",
      enabled: false,
      status: "coming-soon",
    },
  ])

  const handleFeatureToggle = (featureId: string) => {
    setBetaFeatures(
      betaFeatures.map((feature) => (feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature)),
    )

    const feature = betaFeatures.find((f) => f.id === featureId)

    if (feature) {
      toast({
        title: feature.enabled ? `${feature.name} disabled` : `${feature.name} enabled`,
        description: feature.enabled
          ? `You've disabled the ${feature.name} beta feature.`
          : `You've enabled the ${feature.name} beta feature. Please provide feedback on your experience.`,
      })
    }
  }

  const handleJoinBeta = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setBetaEnrolled(true)

    toast({
      title: "Joined Beta Program",
      description: "You've successfully joined the Octomations Beta Program. You'll now have access to early features.",
    })

    setIsLoading(false)
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback! It helps us improve Octomations.",
    })

    setFeedback("")
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Beta Program</CardTitle>
          <CardDescription>Join our beta program to get early access to new features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                <Beaker className="h-5 w-5 text-[#e63327]" />
              </div>
              <div>
                <p className="font-medium">Octomations Beta Program</p>
                <p className="text-sm text-muted-foreground">
                  Get early access to upcoming features and provide feedback
                </p>
              </div>
            </div>
            <Button
              className={
                betaEnrolled
                  ? "bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
                  : "bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
              }
              onClick={handleJoinBeta}
              disabled={isLoading || betaEnrolled}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : betaEnrolled ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Enrolled
                </>
              ) : (
                "Join Beta Program"
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Beta Features</h3>
            <p className="text-sm text-muted-foreground">Toggle features on or off to try them out</p>
          </div>

          <div className="space-y-4">
            {betaFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#e63327]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{feature.name}</p>
                      <Badge
                        variant={
                          feature.status === "beta" ? "default" : feature.status === "alpha" ? "destructive" : "outline"
                        }
                        className={
                          feature.status === "beta"
                            ? "bg-[#2be0bc]/20 text-black border border-[#2be0bc] font-medium"
                            : feature.status === "alpha"
                              ? "bg-[#f97316]/20 text-black border border-[#f97316] font-medium"
                              : "bg-gray-200 text-gray-600 border border-gray-300 font-medium"
                        }
                      >
                        {feature.status === "alpha" && "Alpha"}
                        {feature.status === "beta" && "Beta"}
                        {feature.status === "coming-soon" && "Coming Soon"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <Switch
                  checked={feature.enabled}
                  onCheckedChange={() => handleFeatureToggle(feature.id)}
                  className="data-[state=checked]:bg-[#2be0bc]"
                  disabled={feature.status === "coming-soon" || !betaEnrolled}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>Share your thoughts and suggestions to help us improve</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#e63327]" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Share Your Feedback</p>
                <p className="text-sm text-muted-foreground">Your feedback helps us build a better product</p>
              </div>
            </div>

            <Textarea
              placeholder="Tell us what you think about Octomations or suggest new features..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[150px] rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
            />

            <Button
              type="submit"
              className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
              disabled={isLoading || !feedback.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
