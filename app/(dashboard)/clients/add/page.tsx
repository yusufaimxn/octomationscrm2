"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { ClientForm } from "@/components/clients/client-form"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"

export default function AddClientPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsAuthChecking(true)
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
            description: "You must be logged in to add clients.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }
      } catch (error) {
        console.error("Auth error:", error)
        toast({
          title: "Authentication error",
          description: "Please try logging in again.",
          variant: "destructive",
        })
        router.push("/login")
      } finally {
        setIsAuthChecking(false)
      }
    }

    checkAuth()
  }, [router, toast])

  // Empty initial data for a new client
  const emptyClientData = {
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    source: "Manual",
    notes: "",
  }

  const handleCancel = () => {
    router.push("/clients")
  }

  if (isAuthChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2be0bc]" />
        <p className="mt-4 text-zinc-400">Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={handleCancel} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Client</h1>
        <p className="text-muted-foreground mt-1">Create a new client in your CRM</p>
      </div>

      <ClientForm initialData={emptyClientData} mode="add" onCancel={handleCancel} />
    </div>
  )
}
