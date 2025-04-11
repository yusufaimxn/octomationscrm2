"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pin, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Note {
  id: string
  content: string
  timestamp: string
  isPinned: boolean
}

interface ClientNotesProps {
  notes: Note[]
  onTogglePin: (id: string) => void
  onDeleteNote: (id: string) => void
}

export function ClientNotes({ notes, onTogglePin, onDeleteNote }: ClientNotesProps) {
  // Sort notes: pinned first, then by timestamp (assuming newest first)
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  return (
    <div className="space-y-4">
      {sortedNotes.length > 0 ? (
        sortedNotes.map((note) => (
          <Card
            key={note.id}
            className={cn(
              "rounded-xl transition-all duration-200 hover:shadow-md",
              note.isPinned && "border-[#2be0bc]/50 bg-[#2be0bc]/5",
            )}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <p className="whitespace-pre-wrap">{note.content}</p>
                  <p className="text-xs text-muted-foreground">{note.timestamp}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full",
                      note.isPinned && "text-[#2be0bc] hover:text-[#2be0bc]/80 hover:bg-[#2be0bc]/10",
                    )}
                    onClick={() => onTogglePin(note.id)}
                    title={note.isPinned ? "Unpin note" : "Pin note"}
                  >
                    <Pin className="h-4 w-4" />
                    <span className="sr-only">{note.isPinned ? "Unpin note" : "Pin note"}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDeleteNote(note.id)}
                    title="Delete note"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete note</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No notes yet. Add your first note about this client.
        </div>
      )}
    </div>
  )
}
