"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { Menu, User, Phone, Lock, CreditCard, AlertTriangle, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Get the current section from the pathname
  const getCurrentSection = () => {
    const path = pathname.split("/").pop()
    switch (path) {
      case "account":
        return "Personal Info"
      case "contact":
        return "Contact Info"
      case "security":
        return "Security"
      case "billing":
        return "Billing"
      case "actions":
        return "Account Actions"
      default:
        return "Settings"
    }
  }

  const handleSaveAll = () => {
    toast({
      title: "Changes saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const settingsSections = [
    {
      title: "Personal Info",
      href: "/settings/account",
      icon: User,
      active: pathname === "/settings/account",
    },
    {
      title: "Contact Info",
      href: "/settings/contact",
      icon: Phone,
      active: pathname === "/settings/contact",
    },
    {
      title: "Security",
      href: "/settings/security",
      icon: Lock,
      active: pathname === "/settings/security",
    },
    {
      title: "Billing",
      href: "/settings/billing",
      icon: CreditCard,
      active: pathname === "/settings/billing",
    },
    {
      title: "Account Actions",
      href: "/settings/actions",
      icon: AlertTriangle,
      active: pathname === "/settings/actions",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/settings/account">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{getCurrentSection()}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button
            onClick={handleSaveAll}
            className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow hidden md:flex"
          >
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Sidebar */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden mb-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <Menu className="h-4 w-4 mr-2" />
                {getCurrentSection()}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your account settings</p>
              </div>
              <ScrollArea className="h-[calc(100vh-85px)]">
                <div className="p-4">
                  <nav className="flex flex-col gap-2">
                    {settingsSections.map((section) => (
                      <Link
                        key={section.href}
                        href={section.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-[#2be0bc]",
                          section.active ? "bg-[#2be0bc]/10 text-[#2be0bc]" : "text-muted-foreground",
                        )}
                      >
                        <section.icon className="h-5 w-5" />
                        {section.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-[240px] shrink-0">
            <div className="sticky top-20 border rounded-xl overflow-hidden">
              <div className="p-4 border-b bg-muted/50">
                <h2 className="font-semibold">Settings</h2>
                <p className="text-xs text-muted-foreground">Manage your account</p>
              </div>
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-3">
                  <nav className="flex flex-col gap-1">
                    {settingsSections.map((section) => (
                      <Link
                        key={section.href}
                        href={section.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-[#2be0bc]",
                          section.active ? "bg-[#2be0bc]/10 text-[#2be0bc]" : "text-muted-foreground",
                        )}
                      >
                        <section.icon className="h-5 w-5" />
                        {section.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}

            {/* Mobile Save Button */}
            <div className="md:hidden fixed bottom-4 right-4 z-10">
              <Button
                onClick={handleSaveAll}
                className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
