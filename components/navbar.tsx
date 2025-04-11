"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase"
import { UserNav } from "@/components/user-nav"
import { GlobalSearch } from "@/components/global-search"
import { NotificationBell } from "@/components/notification-bell"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const supabase = getSupabaseBrowser()

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)
    if (path.length === 0) return "Dashboard"

    // Handle special cases
    if (path[0] === "dashboard" && path.length === 1) return "Dashboard"

    // Get the last meaningful segment
    const lastSegment = path[path.length - 1]

    // Handle dynamic routes
    if (lastSegment.startsWith("[") && lastSegment.endsWith("]")) {
      if (path[path.length - 2]) {
        return path[path.length - 2].charAt(0).toUpperCase() + path[path.length - 2].slice(1)
      }
      return "Details"
    }

    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0 sm:w-[300px]">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/dashboard" className="text-lg font-semibold">
                  Octomations CRM
                </Link>
              </div>
              <nav className="flex flex-col gap-1 p-4">{/* Mobile navigation is handled by CollapsibleSidebar */}</nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hidden md:block">
            <h1 className="text-xl font-bold">Octomations CRM</h1>
          </Link>
          <div className="hidden md:block">
            <h2 className="text-lg font-medium ml-6">{getPageTitle()}</h2>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <GlobalSearch />
          <NotificationBell />
          <UserNav user={user} />
        </div>
      </div>
    </header>
  )
}
