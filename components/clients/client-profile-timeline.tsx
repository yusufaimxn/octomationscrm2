import { MessageSquare, Mail, Calendar, RefreshCw, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  type: "message_sent" | "email_opened" | "follow_up" | "status_change" | "note_added"
  title: string
  timestamp: string
  date: string
}

interface ClientProfileTimelineProps {
  activities: ActivityItem[]
}

export function ClientProfileTimeline({ activities }: ClientProfileTimelineProps) {
  // Group activities by date
  const groupedActivities: Record<string, ActivityItem[]> = {}

  activities.forEach((activity) => {
    if (!groupedActivities[activity.date]) {
      groupedActivities[activity.date] = []
    }
    groupedActivities[activity.date].push(activity)
  })

  // Get activity icon
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "message_sent":
        return <MessageSquare className="h-4 w-4" />
      case "email_opened":
        return <Mail className="h-4 w-4" />
      case "follow_up":
        return <Calendar className="h-4 w-4" />
      case "status_change":
        return <RefreshCw className="h-4 w-4" />
      case "note_added":
        return <FileText className="h-4 w-4" />
    }
  }

  // Get activity color
  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "message_sent":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
      case "email_opened":
        return "text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-300"
      case "follow_up":
        return "text-amber-500 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
      case "status_change":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300"
      case "note_added":
        return "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300"
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedActivities).map(([date, dateActivities]) => (
        <div key={date}>
          <h3 className="text-sm font-medium mb-3">{date}</h3>
          <div className="space-y-3">
            {dateActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      getActivityColor(activity.type),
                    )}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  {/* Vertical line connecting activities */}
                  {dateActivities.indexOf(activity) !== dateActivities.length - 1 && (
                    <div className="w-px h-full bg-border absolute top-8 bottom-0 left-1/2 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
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
