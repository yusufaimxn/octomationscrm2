"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SidebarProfileProps {
  isCollapsed?: boolean
  className?: string
}

export function SidebarProfile({ isCollapsed = false, className }: SidebarProfileProps) {
  const router = useRouter()
  const supabase = getSupabaseBrowser()
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data - in a real app, you would fetch this from your auth provider
  const user = {
    name: "John Doe",
    role: "Admin",
    image: null, // Set to an image URL if available
    email: "john@octomations.com",
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
    setIsLoading(false)
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className={cn(
        "border-t py-4 px-4 flex items-center gap-3 transition-all duration-200",
        isCollapsed ? "justify-center" : "justify-start",
        className,
      )}
    >
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 outline-none transition-all duration-200 hover:opacity-80 w-full">
                  <Avatar className="h-10 w-10 ring-2 ring-transparent hover:ring-[#2be0bc] transition-all duration-200">
                    <AvatarImage src={user.image || undefined} alt={user.name} />
                    <AvatarFallback className="bg-[#2be0bc]/10 text-[#2be0bc] font-medium">{initials}</AvatarFallback>
                  </Avatar>

                  {!isCollapsed && (
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-bold truncate max-w-[120px]">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>

              {isCollapsed && (
                <TooltipContent side="right">
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs opacity-70">{user.role}</span>
                  </div>
                </TooltipContent>
              )}
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-md max-w-xs text-sm">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="hover:bg-muted/50 cursor-pointer">
            <Link href="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>View Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="hover:bg-muted/50 cursor-pointer">
            <Link href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleSignOut}
            disabled={isLoading}
            className="cursor-pointer text-[#e63327] focus:text-[#e63327] focus:bg-[#e63327]/10 hover:bg-[#e63327]/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isLoading ? "Signing out..." : "Logout"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
