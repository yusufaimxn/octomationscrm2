"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Shield, KeyRound, AlertTriangle, HelpCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SecuritySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [suspiciousLoginAlerts, setSuspiciousLoginAlerts] = useState(true)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Sample login history data
  const loginHistory = [
    { id: 1, time: "2023-06-15 14:32:45", ip: "192.168.1.1", location: "San Francisco, CA", device: "Chrome / macOS" },
    { id: 2, time: "2023-06-10 09:15:22", ip: "192.168.1.1", location: "San Francisco, CA", device: "Safari / iOS" },
    {
      id: 3,
      time: "2023-06-05 18:45:11",
      ip: "192.168.1.1",
      location: "San Francisco, CA",
      device: "Firefox / Windows",
    },
  ]

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })

    setPasswordModalOpen(false)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsLoading(false)
  }

  const handle2FAToggle = async () => {
    setTwoFactorEnabled(!twoFactorEnabled)

    toast({
      title: !twoFactorEnabled ? "2FA Enabled" : "2FA Disabled",
      description: !twoFactorEnabled
        ? "Two-factor authentication has been enabled for your account."
        : "Two-factor authentication has been disabled for your account.",
      variant: !twoFactorEnabled ? "default" : "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your password and two-factor authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                <KeyRound className="h-5 w-5 text-[#e63327]" />
              </div>
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
            </div>
            <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-lg">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-xl">
                <form onSubmit={handlePasswordSubmit}>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>Update your password to keep your account secure</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPasswordModalOpen(false)}
                      className="rounded-lg bg-[#e8eae5] text-black hover:bg-[#d8dad5] hover:scale-105 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#e63327]" />
              </div>
              <div>
                <p className="font-medium">Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handle2FAToggle}
              className="data-[state=checked]:bg-[#2be0bc]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[#e63327]" />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium">Suspicious Login Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about unusual login attempts</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        We'll alert you when we detect logins from new devices, locations, or suspicious IP addresses.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Switch
              checked={suspiciousLoginAlerts}
              onCheckedChange={setSuspiciousLoginAlerts}
              className="data-[state=checked]:bg-[#2be0bc]"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>Recent login activity on your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Time</th>
                  <th className="text-left p-3 font-medium">IP Address</th>
                  <th className="text-left p-3 font-medium">Location</th>
                  <th className="text-left p-3 font-medium">Device</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((login) => (
                  <tr key={login.id} className="border-t">
                    <td className="p-3">{login.time}</td>
                    <td className="p-3">{login.ip}</td>
                    <td className="p-3">{login.location}</td>
                    <td className="p-3">{login.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="rounded-lg bg-[#e8eae5] text-black hover:bg-[#d8dad5] hover:scale-105 transition-all duration-200"
          >
            View Full History
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
