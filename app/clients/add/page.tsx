"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ClientForm } from "@/components/clients/client-form"
import { useToast } from "@/hooks/use-toast"

export interface ClientFormData {
  name: string
  email: string
  phone: string
  companyName: string
  label: string
  status: string
  sourceChannel: string
  location: string
  dateAdded: string
  notes?: string
}

export default function AddClientPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to create a new client
      // For now, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Client added",
        description: "New client has been added successfully.",
      })

      // Redirect to clients list
      router.push("/clients")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/clients")} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Client</h1>
        <p className="text-muted-foreground mt-1">Create a new client in your CRM</p>
      </div>

      <ClientForm
        initialData={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/clients")}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
