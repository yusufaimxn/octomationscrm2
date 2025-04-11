"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ClientForm } from "@/components/clients/client-form"

// Types
export interface ClientFormData {
  id?: string
  name: string
  email: string
  phone: string
  label: "Prospect" | "Lead" | "Customer" | "VIP"
  status: "Active" | "Inactive" | "Follow-up" | "Closed"
  notes?: string
}

export default function ClientFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [clientData, setClientData] = useState<ClientFormData | null>(null)

  // Check if we're editing an existing client
  const clientId = searchParams.get("id")
  const isEditing = !!clientId

  // Fetch client data if editing
  useEffect(() => {
    if (isEditing) {
      setLoading(true)

      // In a real app, this would be an API call
      // For now, we'll simulate fetching data
      setTimeout(() => {
        // Mock data for demonstration
        setClientData({
          id: clientId,
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+60 12 345 6789",
          label: "Customer",
          status: "Active",
          notes: "Interested in premium plan. Follow up next week.",
        })
        setLoading(false)
      }, 500)
    } else {
      // Initialize with empty data for new client
      setClientData({
        name: "",
        email: "",
        phone: "",
        label: "Prospect",
        status: "Active",
        notes: "",
      })
    }
  }, [clientId, isEditing])

  const handleSubmit = (data: ClientFormData) => {
    setSaving(true)

    // In a real app, this would be an API call
    // For now, we'll simulate saving
    setTimeout(() => {
      setSaving(false)

      toast({
        title: isEditing ? "Client updated" : "Client created",
        description: isEditing
          ? "Client information has been updated successfully."
          : "New client has been added successfully.",
      })

      // Redirect to clients list or client detail page
      router.push(isEditing ? `/clients/${clientId}` : "/clients")
    }, 1000)
  }

  const handleCancel = () => {
    router.push(isEditing ? `/clients/${clientId}` : "/clients")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-2">{isEditing ? "Edit Client" : "Add New Client"}</h1>
      <p className="text-muted-foreground mb-8">
        {isEditing ? "Update client information and preferences" : "Enter the details to add a new client to your CRM"}
      </p>

      {loading ? (
        <Card className="rounded-2xl shadow-md p-8 flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">Loading client data...</div>
        </Card>
      ) : (
        <ClientForm initialData={clientData} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={saving} />
      )}
    </div>
  )
}
