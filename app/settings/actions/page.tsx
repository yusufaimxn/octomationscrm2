"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"
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
import { useRouter } from "next/navigation"

export default function AccountActionsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleDeactivateAccount = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setDeactivateDialogOpen(false)

      toast({
        title: "Account deactivated",
        description: "Your account has been deactivated. You can reactivate it by logging in again.",
      })

      // Redirect to login page
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }, 1500)
  }

  const handleDeleteAccount = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setDeleteDialogOpen(false)

      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted. All your data has been removed.",
        variant: "destructive",
      })

      // Redirect to login page
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>Manage your account status and visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <div>
              <p className="font-medium">Deactivate Account</p>
              <p className="text-sm text-muted-foreground">
                Temporarily disable your account. You can reactivate it at any time.
              </p>
            </div>
            <Dialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Deactivate</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-xl">
                <DialogHeader>
                  <DialogTitle>Deactivate Account</DialogTitle>
                  <DialogDescription>
                    Your account will be deactivated and hidden from other users. You can reactivate it at any time by
                    logging in again.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-4">While your account is deactivated:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Your profile will be hidden</li>
                    <li>You won't receive notifications</li>
                    <li>Your data will be preserved</li>
                  </ul>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeactivateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="default" onClick={handleDeactivateAccount} disabled={isLoading}>
                    {isLoading ? "Deactivating..." : "Confirm Deactivation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm border-[#e63327]">
        <CardHeader className="text-[#e63327]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Danger Zone</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">Permanent actions that cannot be undone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-[#e63327]/30 rounded-lg bg-[#e63327]/5">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e63327] hover:bg-[#d12d22] hover:scale-105 text-white font-medium transition-all duration-200">
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-[#e63327] flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Delete Account Permanently
                  </DialogTitle>
                  <DialogDescription>
                    This action is permanent and cannot be undone. All your data will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="rounded-lg bg-[#e63327]/5 p-4 border border-[#e63327]/30 mb-4">
                    <p className="text-sm font-medium">You will lose:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                      <li>All your client data and contacts</li>
                      <li>Campaign history and analytics</li>
                      <li>Custom templates and automations</li>
                      <li>All account settings and preferences</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-delete">
                      Type <span className="font-medium">delete my account</span> to confirm
                    </Label>
                    <Input
                      id="confirm-delete"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      className="rounded-lg focus:ring-2 focus:ring-[#e63327] focus:ring-offset-0"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#e63327] hover:bg-[#d12d22] hover:scale-105 text-white font-medium transition-all duration-200"
                    onClick={handleDeleteAccount}
                    disabled={confirmText !== "delete my account" || isLoading}
                  >
                    {isLoading ? "Deleting..." : "Permanently Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
