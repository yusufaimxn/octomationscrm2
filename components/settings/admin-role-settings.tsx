"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, UserPlus, Search, MoreHorizontal, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type UserRole = "admin" | "manager" | "viewer"

interface User {
  id: number
  name: string
  email: string
  role: UserRole
  avatar?: string
  status: "active" | "invited" | "inactive"
  lastActive?: string
}

export function AdminRoleSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "viewer" as UserRole,
    name: "",
  })

  // Sample users data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@octomations.com",
      role: "admin",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@octomations.com",
      role: "manager",
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "viewer",
      status: "active",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "viewer",
      status: "invited",
    },
  ])

  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setInviteData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleRoleChange = (userId: number, role: UserRole) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role } : user)))

    toast({
      title: "Role updated",
      description: `User role has been updated to ${role.charAt(0).toUpperCase() + role.slice(1)}.`,
    })
  }

  const handleRevokeAccess = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))

    toast({
      title: "Access revoked",
      description: "User access has been revoked successfully.",
      variant: "destructive",
    })
  }

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser: User = {
      id: users.length + 1,
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role,
      status: "invited",
    }

    setUsers([...users, newUser])

    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteData.email}.`,
    })

    setInviteModalOpen(false)
    setInviteData({
      email: "",
      role: "viewer",
      name: "",
    })
    setIsLoading(false)
  }

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Role Management</CardTitle>
            <CardDescription>Manage user access and permissions</CardDescription>
          </div>
          <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl">
              <form onSubmit={handleInviteSubmit}>
                <DialogHeader>
                  <DialogTitle>Invite New User</DialogTitle>
                  <DialogDescription>Send an invitation to join your Octomations workspace</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={inviteData.name}
                      onChange={handleInviteChange}
                      placeholder="John Doe"
                      className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteData.email}
                      onChange={handleInviteChange}
                      placeholder="john@example.com"
                      className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={inviteData.role}
                      onValueChange={(value: UserRole) => setInviteData((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger
                        id="role"
                        className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                      >
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {inviteData.role === "admin" && "Full access to all settings and user management"}
                      {inviteData.role === "manager" && "Can manage content but not users or billing"}
                      {inviteData.role === "viewer" && "View-only access to content"}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setInviteModalOpen(false)}
                    className="rounded-lg bg-[#e8eae5] text-black hover:bg-[#d8dad5] hover:scale-105 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
                    disabled={isLoading || !inviteData.email}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Invitation"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
            />
          </div>

          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">User</th>
                  <th className="text-left p-3 font-medium">Role</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Last Active</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-[#e63327]/10 text-[#e63327]">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Select
                        value={user.role}
                        onValueChange={(value: UserRole) => handleRoleChange(user.id, value)}
                        disabled={user.id === 1} // Prevent changing the first admin (yourself)
                      >
                        <SelectTrigger className="w-32 rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          user.status === "active" ? "default" : user.status === "invited" ? "outline" : "secondary"
                        }
                        className={user.status === "active" ? "bg-[#2be0bc] text-black border border-[#2be0bc]/50" : ""}
                      >
                        {user.status === "active" && <Check className="mr-1 h-3 w-3" />}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3">{user.lastActive || "Never"}</td>
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-lg">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              navigator.clipboard.writeText(user.email)
                              toast({
                                title: "Email copied",
                                description: "Email address copied to clipboard",
                              })
                            }}
                          >
                            Copy Email
                          </DropdownMenuItem>
                          {user.status === "invited" && <DropdownMenuItem>Resend Invitation</DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleRevokeAccess(user.id)}
                            disabled={user.id === 1} // Prevent revoking your own access
                          >
                            Revoke Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Role Permissions:</p>
            <ul className="mt-1 space-y-1">
              <li>
                <span className="font-medium">Admin:</span> Full access to all settings and user management
              </li>
              <li>
                <span className="font-medium">Manager:</span> Can manage content but not users or billing
              </li>
              <li>
                <span className="font-medium">Viewer:</span> View-only access to content
              </li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
