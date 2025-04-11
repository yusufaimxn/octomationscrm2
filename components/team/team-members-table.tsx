"use client"
import { MoreHorizontal, PencilIcon, Trash2Icon, CheckCircle2, XCircle, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import type { TeamMember } from "@/app/(dashboard)/team/page"

interface TeamMembersTableProps {
  teamMembers: TeamMember[]
  isLoading: boolean
  onEditRole: (member: TeamMember) => void
  onRemoveMember: (member: TeamMember) => void
}

export function TeamMembersTable({ teamMembers, isLoading, onEditRole, onRemoveMember }: TeamMembersTableProps) {
  // Function to render role badge with appropriate color
  const getRoleBadge = (role: TeamMember["role"]) => {
    const roleStyles = {
      Owner: "bg-purple-500 hover:bg-purple-600",
      Admin: "bg-blue-500 hover:bg-blue-600",
      Editor: "bg-green-500 hover:bg-green-600",
      Viewer: "bg-gray-500 hover:bg-gray-600",
    }

    return <Badge className={`${roleStyles[role]} text-white`}>{role}</Badge>
  }

  // Function to render status badge with appropriate color
  const getStatusBadge = (status: TeamMember["status"]) => {
    const statusConfig = {
      Active: {
        color: "bg-green-500 hover:bg-green-600",
        icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      },
      Inactive: {
        color: "bg-red-500 hover:bg-red-600",
        icon: <XCircle className="h-3 w-3 mr-1" />,
      },
      Pending: {
        color: "bg-yellow-500 hover:bg-yellow-600",
        icon: <Clock className="h-3 w-3 mr-1" />,
      },
    }

    const config = statusConfig[status]

    return (
      <Badge className={`${config.color} text-white flex items-center`}>
        {config.icon}
        {status}
      </Badge>
    )
  }

  // Function to format the last active date
  const formatLastActive = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return "Unknown"
    }
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="w-full overflow-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-zinc-800/50" : ""}>
                  <TableCell>
                    <Skeleton className="h-5 w-32 bg-zinc-700" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-40 bg-zinc-700" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20 bg-zinc-700" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24 bg-zinc-700" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-28 bg-zinc-700" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-full bg-zinc-700 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // Empty state
  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No team members found. Invite someone to get started.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member, index) => (
            <TableRow key={member.id} className={index % 2 === 0 ? "bg-zinc-800/50" : ""}>
              <TableCell className="font-medium">{member.full_name || "—"}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{getRoleBadge(member.role)}</TableCell>
              <TableCell>{getStatusBadge(member.status)}</TableCell>
              <TableCell>{formatLastActive(member.last_active)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-800 text-white border-zinc-700">
                    <DropdownMenuItem onClick={() => onEditRole(member)} className="cursor-pointer flex items-center">
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRemoveMember(member)}
                      className="cursor-pointer text-red-400 focus:text-red-400 flex items-center"
                    >
                      <Trash2Icon className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
