import type React from "react"
import { Navbar } from "@/components/navbar"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { SidebarProvider } from "@/hooks/use-sidebar"
import { MobileWelcome } from "@/components/mobile-welcome"

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <MobileWelcome />
        <div className="flex flex-1">
          <CollapsibleSidebar />
          <main className="flex-1 p-4 md:p-6 transition-all duration-300">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
