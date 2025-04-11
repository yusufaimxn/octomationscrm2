"use client"

import { useEffect, useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase"

export function MobileWelcome() {
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        // Extract first name from email or use metadata if available
        const email = data.user.email || ""
        const firstName = data.user.user_metadata?.first_name || email.split("@")[0] || "User"
        setUserName(firstName)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="sm:hidden px-4 py-3 border-b">
      <h1 className="text-lg font-semibold">
        Welcome back, <span className="capitalize">{userName}</span> 👋
      </h1>
    </div>
  )
}
