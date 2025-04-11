"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamMembersTable } from "@/components/team/team-members-table"
import { InviteMemberDialog } from "@/components/team/invite-member-dialog"
import { EditRoleDialog } from "@/components/team/edit-role-dialog"
import { ConfirmDialog } from "@/components/team/confirm-dialog"

export type TeamMember = {
  id: string
  full_name: string
  email: string
  role: "Owner" | "Admin" | "Editor" | "Viewer"
  status: "Active" | "Inactive" | "Pending"
  last_active: string
  tenant_id: string
}

export default function TeamManagementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Mock tenant ID - in a real app, you would get this from your auth context
  const currentTenantId = "tenant-123"

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("team_members").select("*").eq("tenant_id", currentTenantId)

      if (error) throw error

      setTeamMembers(data || [])
    } catch (error) {
      console.error("Error fetching team members:", error)
      toast({
        title: "Error",
        description: "Failed to load team members. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInviteMember = async (email: string, role: TeamMember["role"]) => {
    try {
      const { error } = await supabase.from("team_members").insert([
        {
          email,
          role,
          status: "Pending",
          full_name: email.split("@")[0], // Placeholder name until user accepts
          tenant_id: currentTenantId,
          last_active: new Date().toISOString(),
        },
      ])

      if (error) throw error

      toast({
        title: "Invitation sent!",
        description: `An invitation has been sent to ${email}.`,
      })

      fetchTeamMembers()
      setInviteDialogOpen(false)
    } catch (error) {
      console.error("Error inviting member:", error)
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditRole = async (memberId: string, newRole: TeamMember["role"]) => {
    try {
      const { error } = await supabase
        .from("team_members")
        .update({ role: newRole })
        .eq("id", memberId)
        .eq("tenant_id", currentTenantId)

      if (error) throw error

      toast({
        title: "Role updated",
        description: "Team member's role has been updated successfully.",
      })

      fetchTeamMembers()
      setEditRoleDialogOpen(false)
    } catch (error) {
      console.error("Error updating role:", error)
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      const { error } = await supabase.from("team_members").delete().eq("id", memberId).eq("tenant_id", currentTenantId)

      if (error) throw error

      toast({
        title: "Member removed",
        description: "Team member has been removed successfully.",
      })

      fetchTeamMembers()
      setConfirmDialogOpen(false)
    } catch (error) {
      console.error("Error removing member:", error)
      toast({
        title: "Error",
        description: "Failed to remove team member. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <Button onClick={() => setInviteDialogOpen(true)} className="bg-[#2be0bc] hover:bg-[#20c0a0] text-black">
          <PlusCircle className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card className="bg-zinc-900 text-white border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamMembersTable
            teamMembers={teamMembers}
            isLoading={isLoading}
            onEditRole={(member) => {
              setSelectedMember(member)
              setEditRoleDialogOpen(true)
            }}
            onRemoveMember={(member) => {
              setSelectedMember(member)
              setConfirmDialogOpen(true)
            }}
          />
        </CardContent>
      </Card>

      <InviteMemberDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} onInvite={handleInviteMember} />

      {selectedMember && (
        <>
          <EditRoleDialog
            open={editRoleDialogOpen}
            onOpenChange={setEditRoleDialogOpen}
            member={selectedMember}
            onSave={(role) => handleEditRole(selectedMember.id, role)}
          />

          <ConfirmDialog
            open={confirmDialogOpen}
            onOpenChange={setConfirmDialogOpen}
            title="Remove Team Member"
            description={`Are you sure you want to remove ${selectedMember.full_name || selectedMember.email} from the team? This action cannot be undone.`}
            onConfirm={() => handleRemoveMember(selectedMember.id)}
          />
        </>
      )}
    </div>
  )
}
