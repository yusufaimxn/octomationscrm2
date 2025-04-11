"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, AlertTriangle, RefreshCw, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type NotificationType = "info" | "alert" | "update" | "all"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  date: string
  read: boolean
  type: "info" | "alert" | "update"
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<NotificationType>("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New lead from OctoPages",
      description: "Sarah Johnson submitted a contact form on your landing page.",
      time: "10:23 AM",
      date: "Today",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Campaign 'Summer Sale' completed",
      description: "Your campaign has ended with 24 conversions and 156 clicks.",
      time: "9:15 AM",
      date: "Today",
      read: false,
      type: "update",
    },
    {
      id: "3",
      title: "WhatsApp API connection issue",
      description: "We detected an issue with your WhatsApp Business API connection. Please check your settings.",
      time: "8:45 AM",
      date: "Today",
      read: false,
      type: "alert",
    },
    {
      id: "4",
      title: "New feature: Analytics dashboard",
      description: "We've added a new analytics dashboard to help you track your performance.",
      time: "3:30 PM",
      date: "Yesterday",
      read: true,
      type: "update",
    },
    {
      id: "5",
      title: "System maintenance scheduled",
      description: "Scheduled maintenance on June 30th from 2:00 AM to 4:00 AM UTC.",
      time: "11:20 AM",
      date: "Jun 25, 2023",
      read: true,
      type: "info",
    },
    {
      id: "6",
      title: "Your trial is ending soon",
      description: "Your trial period will end in 3 days. Upgrade now to continue using all features.",
      time: "9:00 AM",
      date: "Jun 24, 2023",
      read: true,
      type: "alert",
    },
    {
      id: "7",
      title: "New client added to your account",
      description: "Michael Chen was added to your client list.",
      time: "2:45 PM",
      date: "Jun 22, 2023",
      read: true,
      type: "info",
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((notification) => notification.type === activeTab)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const getNotificationIcon = (type: "info" | "alert" | "update") => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-[#2be0bc]" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-[#e63327]" />
      case "update":
        return <RefreshCw className="h-5 w-5 text-[#3b82f6]" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with the latest activities and alerts</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="self-start">
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as NotificationType)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#e63327] text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="update">Updates</TabsTrigger>
          <TabsTrigger value="alert">Alerts</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>
            {activeTab === "all"
              ? "All Notifications"
              : activeTab === "info"
                ? "Information"
                : activeTab === "update"
                  ? "Updates"
                  : "Alerts"}
          </CardTitle>
          <CardDescription>
            {activeTab === "all"
              ? "All your notifications in one place"
              : activeTab === "info"
                ? "Important information about your account and clients"
                : activeTab === "update"
                  ? "Updates about campaigns and features"
                  : "Alerts that require your attention"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-muted/50",
                    !notification.read && "bg-muted/30",
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={cn("font-medium", !notification.read && "text-foreground")}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-[#2be0bc] shrink-0 mt-2" />}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-muted-foreground">
                        {notification.date} at {notification.time}
                      </p>
                      {notification.read && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Read
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  {activeTab === "info" ? (
                    <Info className="h-8 w-8 text-muted-foreground" />
                  ) : activeTab === "update" ? (
                    <RefreshCw className="h-8 w-8 text-muted-foreground" />
                  ) : activeTab === "alert" ? (
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-sm text-muted-foreground max-w-md mt-1">
                  {activeTab === "all"
                    ? "You don't have any notifications yet. They will appear here when you receive them."
                    : `You don't have any ${activeTab} notifications at the moment.`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}
