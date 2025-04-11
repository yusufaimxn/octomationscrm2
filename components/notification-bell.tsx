"use client"

import { useState } from "react"
import { Bell, Check, Clock, Plus, MessageSquare, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type NotificationType = "new_client" | "reminder" | "message" | "alert"

interface Notification {
  id: string
  type: NotificationType
  title: string
  timestamp: string
  read: boolean
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "new_client",
      title: "New client added: Sarah Johnson",
      timestamp: "2 mins ago",
      read: false,
    },
    {
      id: "2",
      type: "reminder",
      title: "Follow-up reminder: Call Michael about proposal",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "message",
      title: "New message from David Lee",
      timestamp: "3 hours ago",
      read: false,
    },
    {
      id: "4",
      type: "alert",
      title: "Campaign 'Summer Sale' ended",
      timestamp: "Yesterday",
      read: true,
    },
    {
      id: "5",
      type: "new_client",
      title: "New client added: Robert Smith",
      timestamp: "2 days ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "new_client":
        return <Plus className="h-4 w-4 text-green-500" />
      case "reminder":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px] rounded-2xl shadow-md p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <DropdownMenuLabel className="p-0 text-base">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs hover:text-[#2be0bc]" onClick={markAllAsRead}>
              <Check className="h-3 w-3 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-3 cursor-pointer",
                  !notification.read && "bg-muted/30",
                  "hover:bg-muted/50 dark:hover:bg-gray-800 transition-colors",
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm line-clamp-2", !notification.read && "font-medium")}>
                      {notification.title}
                    </p>
                    {!notification.read && <span className="h-2 w-2 rounded-full bg-[#2be0bc] shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <div className="flex justify-center mb-2">
                <Bell className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p>No new notifications</p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <Button variant="ghost" className="w-full justify-center rounded-none h-10">
              View all notifications
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
