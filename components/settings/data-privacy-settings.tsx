"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Download, Trash2, Key, Copy, Eye, EyeOff } from "lucide-react"
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

export function DataPrivacySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState("")
  const [showToken, setShowToken] = useState(false)

  // Sample API tokens
  const [apiTokens, setApiTokens] = useState([
    {
      id: 1,
      name: "Production API",
      token: "oct_prod_a1b2c3d4e5f6g7h8i9j0",
      created: "2023-05-15",
      lastUsed: "2023-06-20",
    },
    {
      id: 2,
      name: "Development API",
      token: "oct_dev_z9y8x7w6v5u4t3s2r1q0",
      created: "2023-06-01",
      lastUsed: "2023-06-18",
    },
  ])

  // Consent preferences
  const [consentPreferences, setConsentPreferences] = useState({
    essentialCookies: true,
    analyticsCookies: true,
    marketingCookies: false,
    thirdPartyCookies: false,
    dataCollection: true,
  })

  const handleConsentChange = (key: keyof typeof consentPreferences) => {
    setConsentPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleDownloadData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data export is being prepared. You'll receive an email when it's ready to download.",
    })
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Account deletion requested",
      description: "Your account deletion request has been submitted. You'll receive a confirmation email.",
      variant: "destructive",
    })

    setDeleteAccountOpen(false)
    setConfirmEmail("")
    setIsLoading(false)
  }

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token)
    toast({
      title: "API token copied",
      description: "The API token has been copied to your clipboard.",
    })
  }

  const handleGenerateToken = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newToken = {
      id: apiTokens.length + 1,
      name: `API Token ${apiTokens.length + 1}`,
      token: `oct_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
    }

    setApiTokens([...apiTokens, newToken])

    toast({
      title: "New API token generated",
      description: "Your new API token has been created successfully.",
    })

    setIsLoading(false)
  }

  const handleRevokeToken = (id: number) => {
    setApiTokens(apiTokens.filter((token) => token.id !== id))

    toast({
      title: "API token revoked",
      description: "The API token has been revoked and is no longer valid.",
    })
  }

  const handleSaveConsent = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Consent preferences saved",
      description: "Your privacy and consent preferences have been updated.",
    })

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Download or delete your account data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#e63327]/10 flex items-center justify-center">
                <Download className="h-5 w-5 text-[#e63327]" />
              </div>
              <div>
                <p className="font-medium">Download My Data</p>
                <p className="text-sm text-muted-foreground">Get a copy of all your data stored in Octomations</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-lg bg-[#e8eae5] text-black hover:bg-[#d8dad5] hover:scale-105 transition-all duration-200"
              onClick={handleDownloadData}
            >
              Request Data Export
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border bg-destructive/5">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
            </div>
            <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-lg bg-[#e63327] hover:bg-[#d12d22] hover:scale-105 text-white font-medium transition-all duration-200 shadow-sm hover:shadow"
                >
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-destructive">Delete Account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirmEmail">Please type your email to confirm deletion</Label>
                    <Input
                      id="confirmEmail"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="your-email@example.com"
                      className="rounded-lg focus:ring-2 focus:ring-destructive focus:ring-offset-0"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDeleteAccountOpen(false)}
                    className="rounded-lg bg-[#e8eae5] text-black hover:bg-[#d8dad5] hover:scale-105 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    className="rounded-lg bg-[#e63327] hover:bg-[#d12d22] hover:scale-105 text-white font-medium transition-all duration-200 shadow-sm hover:shadow"
                    disabled={confirmEmail !== "your-email@example.com" || isLoading}
                    onClick={handleDeleteAccount}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Permanently Delete Account"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Consent Preferences</CardTitle>
          <CardDescription>Manage how your data is collected and used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="essentialCookies"
              checked={consentPreferences.essentialCookies}
              onCheckedChange={() => handleConsentChange("essentialCookies")}
              disabled
              className="data-[state=checked]:bg-[#2be0bc] data-[state=checked]:border-[#2be0bc]"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="essentialCookies"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Essential Cookies
              </Label>
              <p className="text-sm text-muted-foreground">
                Required for the website to function properly (cannot be disabled)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="analyticsCookies"
              checked={consentPreferences.analyticsCookies}
              onCheckedChange={() => handleConsentChange("analyticsCookies")}
              className="data-[state=checked]:bg-[#2be0bc] data-[state=checked]:border-[#2be0bc]"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="analyticsCookies"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Analytics Cookies
              </Label>
              <p className="text-sm text-muted-foreground">
                Help us improve our website by collecting anonymous usage data
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketingCookies"
              checked={consentPreferences.marketingCookies}
              onCheckedChange={() => handleConsentChange("marketingCookies")}
              className="data-[state=checked]:bg-[#2be0bc] data-[state=checked]:border-[#2be0bc]"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="marketingCookies"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Marketing Cookies
              </Label>
              <p className="text-sm text-muted-foreground">Allow us to provide personalized marketing content</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="thirdPartyCookies"
              checked={consentPreferences.thirdPartyCookies}
              onCheckedChange={() => handleConsentChange("thirdPartyCookies")}
              className="data-[state=checked]:bg-[#2be0bc] data-[state=checked]:border-[#2be0bc]"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="thirdPartyCookies"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Third-Party Cookies
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow third-party services to store cookies for enhanced functionality
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="dataCollection"
              checked={consentPreferences.dataCollection}
              onCheckedChange={() => handleConsentChange("dataCollection")}
              className="data-[state=checked]:bg-[#2be0bc] data-[state=checked]:border-[#2be0bc]"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="dataCollection"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Usage Data Collection
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow us to collect data about how you use our platform to improve our services
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
            onClick={handleSaveConsent}
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

      <Card className="shadow-sm rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>API Access Tokens</CardTitle>
            <CardDescription>Manage API tokens for accessing Octomations programmatically</CardDescription>
          </div>
          <Button
            className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
            onClick={handleGenerateToken}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Generate New Token
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Token</th>
                  <th className="text-left p-3 font-medium">Created</th>
                  <th className="text-left p-3 font-medium">Last Used</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiTokens.map((token) => (
                  <tr key={token.id} className="border-t">
                    <td className="p-3 font-medium">{token.name}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {showToken ? token.token : token.token.substring(0, 8) + "•••••••••••••••••"}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setShowToken(!showToken)}
                        >
                          {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyToken(token.token)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="p-3">{token.created}</td>
                    <td className="p-3">{token.lastUsed}</td>
                    <td className="p-3">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-lg bg-[#e63327] hover:bg-[#d12d22] hover:scale-105 text-white font-medium transition-all duration-200"
                        onClick={() => handleRevokeToken(token.id)}
                      >
                        Revoke
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            API tokens provide full access to your account. Keep them secure and never share them publicly.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
