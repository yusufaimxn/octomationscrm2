import type React from "react"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="hidden md:flex md:flex-1">
            <h1 className="text-xl font-bold">Octomations CRM</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
