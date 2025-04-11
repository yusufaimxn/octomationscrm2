"use client"

import { useState } from "react"
import { Bell, Info, AlertTriangle, RefreshCw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Link from "next/link"

type NotificationType = "info" | "alert" | "update"

interface Notification {
  id: string
  title: string
  time: string
  read: boolean
  type: NotificationType
}

export function NotificationsDropdown() {
  const [hasUnread, setHasUnread] = useState(true)
  const [unreadCount, setUnreadCount] = useState(3)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New lead from OctoPages",
      time: "3 min ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Campaign 'Summer Sale' completed",
      time: "1 hour ago",
      read: false,
      type: "update",
    },
    {
      id: "3",
      title: "WhatsApp API connection issue",
      time: "2 hours ago",
      read: false,
      type: "alert",
    },
    {
      id: "4",
      title: "New feature: Analytics dashboard",
      time: "Yesterday",
      read: true,
      type: "update",
    },
    {
      id: "5",
      title: "System maintenance scheduled",
      time: "2 days ago",
      read: true,
      type: "info",
    },
  ])

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setHasUnread(false)
    setUnreadCount(0)
  }

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    setNotifications(updatedNotifications)

    // Count remaining unread notifications
    const remainingUnread = updatedNotifications.filter((n) => !n.read).length
    setUnreadCount(remainingUnread)
    setHasUnread(remainingUnread > 0)
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-[#2be0bc]" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-[#e63327]" />
      case "update":
        return <RefreshCw className="h-4 w-4 text-[#3b82f6]" />
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-1 right-1 flex items-center justify-center">
                    {unreadCount > 0 ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#e63327] text-[10px] font-medium text-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[#e63327]" />
                    )}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>

          <DropdownMenuContent align="end" className="w-80 rounded-md p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <DropdownMenuLabel className="p-0 text-base">Notifications</DropdownMenuLabel>
              {hasUnread && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto p-1 hover:text-[#2be0bc]"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:font-medium hover:shadow-sm",
                      !notification.read && "bg-muted/30",
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
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">No notifications</div>
              )}
            </div>

            <DropdownMenuSeparator />
            <Link href="/notifications" className="block">
              <Button variant="ghost" className="w-full justify-between rounded-none h-10">
                <span>View all notifications</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  )
}
