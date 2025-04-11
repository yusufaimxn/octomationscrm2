"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"
import type { ClientFormData } from "./client-form"
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

export function ClientsTable() {
  const router = useRouter()
  const { toast } = useToast()
  const [clients, setClients] = useState<ClientFormData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<ClientFormData | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setClients(data || [])
    } catch (error) {
      console.error("Error fetching clients:", error)
      toast({
        title: "Error",
        description: "Failed to load clients. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!clientToDelete) return

    try {
      const { error } = await supabase.from("clients").delete().eq("id", clientToDelete.id)

      if (error) {
        throw error
      }

      // Remove the deleted client from the state
      setClients(clients.filter((client) => client.id !== clientToDelete.id))

      toast({
        title: "Client deleted",
        description: `${clientToDelete.full_name} has been deleted successfully.`,
      })
    } catch (error) {
      console.error("Error deleting client:", error)
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setClientToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const confirmDelete = (client: ClientFormData) => {
    setClientToDelete(client)
    setDeleteDialogOpen(true)
  }

  const handleViewDetails = (clientId: string) => {
    router.push(`/dashboard/clients/${clientId}`)
  }

  const handleEditClient = (clientId: string) => {
    router.push(`/dashboard/clients/${clientId}/edit`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No clients found. Add your first client to get started.</p>
        <Button
          onClick={() => router.push("/dashboard/clients/add")}
          className="mt-4 bg-[#2be0bc] hover:bg-[#22c9a8] text-black"
        >
          Add Client
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Company</TableHead>
              <TableHead className="hidden lg:table-cell">Label</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.full_name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                <TableCell className="hidden md:table-cell">{client.company || "-"}</TableCell>
                <TableCell className="hidden lg:table-cell">{client.client_label || "-"}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      client.client_status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : client.client_status === "Inactive"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
                          : client.client_status === "Follow-up"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {client.client_status || "Unknown"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(client.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditClient(client.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => confirmDelete(client)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {clientToDelete?.full_name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
