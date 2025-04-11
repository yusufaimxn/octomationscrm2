"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"

export type ClientFormData = {
  id?: string
  name: string
  email: string
  phone: string
  company?: string | null
  status: string
  source?: string
  dateAdded?: string
  notes?: string | null
  user_id?: string
}

interface ClientFormProps {
  initialData: ClientFormData
  onSubmit?: (data: ClientFormData) => void
  onCancel?: () => void
  isSubmitting?: boolean
  mode: "add" | "edit"
}

export function ClientForm({ initialData, onSubmit, onCancel, isSubmitting = false, mode = "add" }: ClientFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<ClientFormData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [authChecking, setAuthChecking] = useState(true)

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthChecking(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (!session) {
          toast({
            title: "Authentication required",
            description: "You must be logged in to perform this action.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }

        setUserId(session.user.id)
      } catch (error) {
        console.error("Auth error:", error)
        toast({
          title: "Authentication error",
          description: "Please try logging in again.",
          variant: "destructive",
        })
      } finally {
        setAuthChecking(false)
      }
    }

    checkAuth()
  }, [router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!userId) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to perform this action.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (onSubmit) {
      onSubmit(formData)
      return
    }

    setSubmitting(true)

    try {
      // Set current date for new clients
      const currentDate = new Date().toISOString()

      if (mode === "edit" && initialData.id) {
        // Update existing client
        const { error } = await supabase
          .from("clients")
          .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            status: formData.status,
            source: formData.source,
            notes: formData.notes,
            // Don't update user_id on edit
          })
          .eq("id", initialData.id)

        if (error) throw error

        toast({
          title: "Client updated",
          description: "Client information has been updated successfully.",
          duration: 3000, // Auto-dismiss after 3 seconds
        })

        // Redirect to client details page
        console.log("Redirecting to client details page...")
        setTimeout(() => {
          router.push(`/clients/${initialData.id}`)
        }, 1500)
      } else {
        // Add new client
        const { data, error } = await supabase
          .from("clients")
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              status: formData.status,
              source: formData.source || "Manual",
              dateAdded: currentDate,
              notes: formData.notes,
              user_id: userId, // Include user_id for RLS
            },
          ])
          .select()

        if (error) throw error

        // Success toast notification
        toast({
          title: "✅ Client added successfully!",
          description: `${formData.name} has been added to your client list.`,
          duration: 3000, // Auto-dismiss after 3 seconds
        })

        // Debug log
        console.log("Redirecting to /clients...")

        // Try redirecting to /clients instead of /dashboard/clients
        setTimeout(() => {
          router.push("/clients")
        }, 1500)
      }
    } catch (error: any) {
      console.error("Error saving client:", error)
      // Error toast notification
      toast({
        title: "Error",
        description: error.message || "Failed to save client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      router.push("/clients")
    }
  }

  if (authChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2be0bc]" />
        <p className="mt-4 text-zinc-400">Checking authentication...</p>
      </div>
    )
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{mode === "edit" ? "Edit Client" : "Add New Client"}</CardTitle>
          <CardDescription>
            {mode === "edit" ? "Update client information" : "Enter the details of the new client"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={submitting}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={submitting}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={submitting}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company || ""}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
                disabled={submitting}
              >
                <SelectTrigger id="status" className="rounded-xl">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select
                value={formData.source || "Manual"}
                onValueChange={(value) => handleSelectChange("source", value)}
                disabled={submitting}
              >
                <SelectTrigger id="source" className="rounded-xl">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              disabled={submitting}
              rows={4}
              className="rounded-xl"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={submitting} className="rounded-xl">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting || isSubmitting || !userId}
            className="bg-[#2be0bc] hover:bg-[#22c9a8] text-black font-medium rounded-xl transition-all duration-200"
          >
            {submitting || isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {mode === "edit" ? "Updating..." : "Adding..."}
              </span>
            ) : mode === "edit" ? (
              "Update Client"
            ) : (
              "Add Client"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
