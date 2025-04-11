"use client"

import { useState } from "react"
import { AddClientModal } from "@/components/clients/AddClientModal"
import { EditClientModal } from "@/components/clients/EditClientModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Edit, Trash2 } from "lucide-react"

interface ClientFormData {
  name: string
  email: string
  phone: string
  status: string
  notes: string
}

export default function ModalExamplePage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [clients, setClients] = useState<ClientFormData[]>([])
  const [currentClient, setCurrentClient] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    notes: "",
  })
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const handleSaveClient = (client: ClientFormData) => {
    setClients((prev) => [...prev, client])
    setShowAddModal(false)
  }

  const handleEditClient = (client: ClientFormData, index: number) => {
    setCurrentClient(client)
    setCurrentIndex(index)
    setShowEditModal(true)
  }

  const handleUpdateClient = (updatedClient: ClientFormData) => {
    setClients((prev) => prev.map((client, index) => (index === currentIndex ? updatedClient : client)))
    setShowEditModal(false)
  }

  const handleDeleteClient = (index: number) => {
    setClients((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Modal Example</h1>
          <p className="text-muted-foreground">Demonstration of the Add & Edit Client Modal components</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
          <CardDescription>Add, edit, or remove clients using the modal components</CardDescription>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No clients added yet. Click the "Add Client" button to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {clients.map((client, index) => (
                <div key={index} className="border rounded-xl p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{client.name}</h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        client.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                    >
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  {client.phone && <p className="text-sm">{client.phone}</p>}
                  {client.notes && (
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Notes:</p>
                      <p className="text-muted-foreground">{client.notes}</p>
                    </div>
                  )}
                  <div className="mt-3 flex gap-2 justify-end">
                    <button
                      onClick={() => handleEditClient(client, index)}
                      className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClient(index)}
                      className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddClientModal showModal={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleSaveClient} />

      <EditClientModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateClient}
        client={currentClient}
      />
    </div>
  )
}
