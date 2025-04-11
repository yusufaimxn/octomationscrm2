"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { ClientForm, type ClientFormData } from "@/components/clients/client-form"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"

export default function EditClientPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [clientData, setClientData] = useState<ClientFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
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
        fetchClient(session.user.id)
      } catch (error) {
        console.error("Auth error:", error)
        toast({
          title: "Authentication error",
          description: "Please try logging in again.",
          variant: "destructive",
        })
        router.push("/login")
      }
    }

    const fetchClient = async (currentUserId: string) => {
      try {
        setIsLoading(true)
        setError(null)

        // Validate that id is a UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(params.id as string)) {
          router.push("/clients")
          return
        }

        const { data, error } = await supabase
          .from("clients")
          .select("*")
          .eq("id", params.id)
          .eq("user_id", currentUserId) // Only fetch clients belonging to the current user
          .single()

        if (error) throw error

        if (data) {
          // Map database fields to form fields
          const formData: ClientFormData = {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            company: data.company,
            status: data.status,
            notes: data.notes,
            user_id: data.user_id,
          }
          setClientData(formData)
        } else {
          toast({
            title: "Client not found",
            description: "The requested client could not be found or you don't have permission to edit it.",
            variant: "destructive",
          })
          router.push("/clients")
        }
      } catch (err) {
        console.error("Error fetching client:", err)
        setError("Failed to load client details. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [params.id, router, toast])

  const handleCancel = () => {
    router.push(`/clients/${params.id}`)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2be0bc]" />
        <p className="mt-4 text-zinc-400">Loading client details...</p>
      </div>
    )
  }

  if (error || !clientData) {
    return (
      <div className="p-8">
        <Button variant="ghost" onClick={() => router.push("/clients")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>

        <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Error</h3>
          <p className="text-zinc-300">{error || "Client not found"}</p>
          <Button onClick={() => router.push("/clients")} variant="outline" className="mt-4">
            Return to Clients
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={handleCancel} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Client
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
        <p className="text-muted-foreground mt-1">Update client information</p>
      </div>

      <ClientForm initialData={clientData} mode="edit" onCancel={handleCancel} />
    </div>
  )
}
