"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, EyeOff, LogOut, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SecurityPage() {
  const { toast } = useToast()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
  }

  const handleLogoutAllDevices = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setLogoutDialogOpen(false)

      toast({
        title: "Logged out from all devices",
        description: "You have been successfully logged out from all other devices.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
          >
            <Save className="mr-2 h-4 w-4" />
            Update Password
          </Button>
        </CardFooter>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#2be0bc]/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-[#2be0bc]" />
              </div>
              <div>
                <p className="font-medium">Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-muted-foreground">
                  Require a verification code when logging in from an unrecognized device
                </p>
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
              className="data-[state=checked]:bg-[#2be0bc]"
            />
          </div>

          {twoFactorEnabled && (
            <div className="bg-muted/50 p-4 rounded-lg mt-4">
              <p className="text-sm">
                Two-factor authentication is enabled. You will receive a verification code via email when logging in
                from a new device.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Manage your active sessions and devices</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Logout from all devices
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>Logout from all devices</DialogTitle>
                <DialogDescription>
                  This will log you out from all devices except your current one. You'll need to log in again on those
                  devices.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleLogoutAllDevices}
                  className="bg-[#e63327] hover:bg-[#d12d22] hover:scale-105 text-white font-medium transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging out..." : "Confirm Logout"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              This will terminate all active sessions on other devices where you're currently logged in.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
