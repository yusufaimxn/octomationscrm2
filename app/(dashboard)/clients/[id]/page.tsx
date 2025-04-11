"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { format } from "date-fns"
import {
  Loader2,
  ArrowLeft,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  Tag,
  MessageSquare,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface Client {
  id: string
  full_name: string
  email: string
  phone: string
  status: string
  source_channel: string
  created_at: string
  company?: string
  location?: string
  notes?: string
}

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id === "add") {
      router.push("/dashboard/clients/add")
      return
    }

    fetchClient()
  }, [params.id])

  const fetchClient = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate that id is a UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(params.id as string)) {
        router.push("/dashboard/clients")
        return
      }

      const { data, error } = await supabase.from("clients").select("*").eq("id", params.id).single()

      if (error) throw error

      setClient(data)
    } catch (err) {
      console.error("Error fetching client:", err)
      setError("Failed to load client details. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!client) return

    try {
      const { error } = await supabase.from("clients").delete().eq("id", client.id)

      if (error) throw error

      toast({
        title: "Client deleted",
        description: `${client.full_name} has been deleted successfully.`,
      })

      router.push("/dashboard/clients")
    } catch (err) {
      console.error("Error deleting client:", err)
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "lead":
        return "secondary"
      case "active":
        return "success"
      case "inactive":
        return "destructive"
      default:
        return "default"
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading client details...</p>
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="p-8">
        <Button variant="ghost" onClick={() => router.push("/dashboard/clients")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>

        <div className="p-8 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-destructive mb-2">Error</h3>
          <p className="text-muted-foreground">{error || "Client not found"}</p>
          <Button onClick={fetchClient} variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/clients")} className="h-9">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/clients/${client.id}/edit`)} className="h-9">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)} className="h-9">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Client Info Card */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{client.full_name}</CardTitle>
            <div className="flex items-center mt-2">
              <Badge variant={getStatusBadgeVariant(client.status)} className="text-xs">
                {client.status?.charAt(0).toUpperCase() + client.status?.slice(1) || "Unknown"}
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">
                <Tag className="h-3 w-3 inline mr-1" />
                {client.source_channel || "No source"}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{client.phone || "Not provided"}</p>
                </div>
              </div>

              {client.company && (
                <div className="flex items-start">
                  <Building2 className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">{client.company}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date Added</p>
                  <p className="text-sm text-muted-foreground">
                    {client.created_at ? format(new Date(client.created_at), "MMMM d, yyyy") : "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <p className="text-sm font-medium mb-1">Client ID</p>
              <p className="text-xs font-mono bg-muted p-2 rounded-md overflow-x-auto">{client.id}</p>
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/dashboard/clients/${client.id}/edit`)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Client Information
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column - Notes and Campaign Activity */}
        <div className="space-y-6">
          {/* Internal Notes Section */}
          <Card className="rounded-2xl shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Internal Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {client.notes ? (
                <div className="bg-muted p-4 rounded-xl whitespace-pre-line text-sm">{client.notes}</div>
              ) : (
                <div className="bg-muted p-4 rounded-xl text-center text-sm text-muted-foreground">
                  No notes available for this client.
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/dashboard/clients/${client.id}/edit`)}
              >
                Add/Edit Notes
              </Button>
            </CardFooter>
          </Card>

          {/* Campaign Activity Section */}
          <Card className="rounded-2xl shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Campaign Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-xl text-center text-sm text-muted-foreground">
                Campaign activity tracking will be available soon.
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" disabled>
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {client.full_name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
