"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, Bell, Smartphone } from "lucide-react"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    sms: true,
    push: true,
  })

  const handleToggleChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how you receive notifications from Octomations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-y-0">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#e63327]" />
                </div>
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={() => handleToggleChange("email")}
                className="data-[state=checked]:bg-[#2be0bc]"
              />
            </div>

            <div className="flex items-center justify-between space-y-0">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#e63327]" />
                </div>
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                </div>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={() => handleToggleChange("marketing")}
                className="data-[state=checked]:bg-[#2be0bc]"
              />
            </div>

            <div className="flex items-center justify-between space-y-0">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-[#e63327]" />
                </div>
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive text messages for critical alerts</p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={() => handleToggleChange("sms")}
                className="data-[state=checked]:bg-[#2be0bc]"
              />
            </div>

            <div className="flex items-center justify-between space-y-0">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-[#e63327]" />
                </div>
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive browser and mobile push notifications</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={() => handleToggleChange("push")}
                className="data-[state=checked]:bg-[#2be0bc]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
