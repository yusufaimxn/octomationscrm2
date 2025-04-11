"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Pencil, MessageSquare, Calendar, Clock, Mail, Phone } from "lucide-react"
import { ClientProfileTimeline } from "@/components/clients/client-profile-timeline"

// Types
type ClientStatus = "Active" | "Inactive" | "Lead" | "Follow-up"
type ClientLabel = "VIP" | "Prospect" | "Customer" | "Lead"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: ClientStatus
  label: ClientLabel
  dateAdded: string
  lastUpdated: string
}

interface ActivityItem {
  id: string
  type: "message_sent" | "email_opened" | "follow_up" | "status_change" | "note_added"
  title: string
  timestamp: string
  date: string
}

interface Note {
  id: string
  content: string
  timestamp: string
}

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")

  // Fetch client data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockClient: Client = {
      id: params.id,
      name: "Alex Thompson",
      email: "alex@example.com",
      phone: "+60 12 345 6789",
      status: "Active",
      label: "VIP",
      dateAdded: "15 Mar 2023",
      lastUpdated: "2 days ago",
    }

    const mockActivities: ActivityItem[] = [
      {
        id: "1",
        type: "message_sent",
        title: "Auto message sent: Welcome sequence",
        timestamp: "10:30 AM",
        date: "Today",
      },
      {
        id: "2",
        type: "email_opened",
        title: "Client opened email: Monthly newsletter",
        timestamp: "2:45 PM",
        date: "Yesterday",
      },
      {
        id: "3",
        type: "follow_up",
        title: "Follow-up reminder set for next week",
        timestamp: "11:20 AM",
        date: "3 days ago",
      },
      {
        id: "4",
        type: "status_change",
        title: "Status changed from Lead to Active",
        timestamp: "9:15 AM",
        date: "1 week ago",
      },
      {
        id: "5",
        type: "note_added",
        title: "Note added: Client interested in premium plan",
        timestamp: "3:30 PM",
        date: "2 weeks ago",
      },
    ]

    const mockNotes: Note[] = [
      {
        id: "1",
        content: "Client expressed interest in our premium plan. Scheduled a demo for next Tuesday at 2 PM.",
        timestamp: "2 days ago",
      },
      {
        id: "2",
        content: "Follow-up call went well. Alex mentioned they're comparing our services with two other providers.",
        timestamp: "1 week ago",
      },
      {
        id: "3",
        content: "Initial contact made through website form. Responded to inquiry about pricing.",
        timestamp: "2 weeks ago",
      },
    ]

    setClient(mockClient)
    setActivities(mockActivities)
    setNotes(mockNotes)
    setLoading(false)
  }, [params.id])

  // Handle adding a new note
  const handleAddNote = () => {
    if (!newNote.trim()) return

    const newNoteObj: Note = {
      id: (notes.length + 1).toString(),
      content: newNote,
      timestamp: "Just now",
    }

    setNotes([newNoteObj, ...notes])

    // Add to activities
    const newActivity: ActivityItem = {
      id: (activities.length + 1).toString(),
      type: "note_added",
      title: `Note added: ${newNote.substring(0, 40)}${newNote.length > 40 ? "..." : ""}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: "Today",
    }

    setActivities([newActivity, ...activities])
    setNewNote("")

    toast({
      title: "Note added",
      description: "Your note has been added to the client's profile.",
    })
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: ClientStatus) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "destructive"
      case "Lead":
        return "secondary"
      case "Follow-up":
        return "warning"
      default:
        return "default"
    }
  }

  // Get label badge variant
  const getLabelBadgeVariant = (label: ClientLabel) => {
    switch (label) {
      case "VIP":
        return "blue"
      case "Prospect":
        return "yellow"
      case "Customer":
        return "purple"
      case "Lead":
        return "orange"
      default:
        return "default"
    }
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading client profile...</div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold mb-2">Client Not Found</h2>
        <p className="text-muted-foreground mb-4">The client you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/clients">Back to Clients</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4" />
            All Clients
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <Card className="rounded-2xl shadow-md lg:col-span-1 dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Client Profile</CardTitle>
              <div className="flex gap-2">
                <Badge variant={getStatusBadgeVariant(client.status)}>{client.status}</Badge>
                <Badge variant={getLabelBadgeVariant(client.label)}>{client.label}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {getInitials(client.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-center">{client.name}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Added on {client.dateAdded}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Last updated {client.lastUpdated}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-3">
              <Button
                className="bg-[#2be0bc] hover:bg-[#22c9a8] text-black font-medium rounded-2xl transition-all duration-200 hover:shadow-md w-full"
                asChild
              >
                <Link href={`/clients/form?id=${client.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Client
                </Link>
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-2xl transition-all duration-200 hover:shadow-md w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline and Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Timeline */}
          <Card className="rounded-2xl shadow-md dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientProfileTimeline activities={activities} />
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card className="rounded-2xl shadow-md dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a new note about this client..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="rounded-xl min-h-[100px] dark:bg-gray-800 dark:border-gray-700"
                />
                <Button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="bg-[#2be0bc] hover:bg-[#22c9a8] text-black font-medium rounded-2xl transition-all duration-200 hover:shadow-md"
                >
                  Save Note
                </Button>
              </div>

              <Separator />

              {/* Notes History */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Recent Notes</h3>
                {notes.length > 0 ? (
                  notes.slice(0, 3).map((note) => (
                    <div key={note.id} className="p-3 bg-muted rounded-xl dark:bg-gray-800">
                      <p className="text-sm mb-2">{note.content}</p>
                      <p className="text-xs text-muted-foreground">{note.timestamp}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No notes yet. Add your first note about this client.
                  </div>
                )}
                {notes.length > 3 && (
                  <Button variant="ghost" size="sm" className="w-full text-sm">
                    View all {notes.length} notes
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
