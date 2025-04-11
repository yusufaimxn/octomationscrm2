import { MessageSquare, StickyNote, RefreshCw, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: string
  date: string
  time: string
  type: "message_sent" | "note_added" | "status_changed" | "client_created"
  description: string
}

interface ClientTimelineProps {
  events: TimelineEvent[]
}

export function ClientTimeline({ events }: ClientTimelineProps) {
  // Group events by date
  const groupedEvents: Record<string, TimelineEvent[]> = {}

  events.forEach((event) => {
    if (!groupedEvents[event.date]) {
      groupedEvents[event.date] = []
    }
    groupedEvents[event.date].push(event)
  })

  // Get event icon
  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "message_sent":
        return <MessageSquare className="h-4 w-4" />
      case "note_added":
        return <StickyNote className="h-4 w-4" />
      case "status_changed":
        return <RefreshCw className="h-4 w-4" />
      case "client_created":
        return <UserPlus className="h-4 w-4" />
    }
  }

  // Get event color
  const getEventColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "message_sent":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
      case "note_added":
        return "text-amber-500 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
      case "status_changed":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300"
      case "client_created":
        return "text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-300"
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([date, dateEvents]) => (
        <div key={date}>
          <h3 className="text-sm font-medium mb-3">{date}</h3>
          <div className="space-y-3">
            {dateEvents.map((event) => (
              <div key={event.id} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn("h-8 w-8 rounded-full flex items-center justify-center", getEventColor(event.type))}
                  >
                    {getEventIcon(event.type)}
                  </div>
                  {/* Vertical line connecting events */}
                  {dateEvents.indexOf(event) !== dateEvents.length - 1 && (
                    <div className="w-px h-full bg-border absolute top-8 bottom-0 left-1/2 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{event.description}</p>
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
