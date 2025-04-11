"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChevronDown, FileText, HelpCircle, Home, Info, Menu, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: boolean
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "#",
    icon: <Settings className="h-5 w-5" />,
    submenu: true,
    children: [
      {
        title: "FAQ",
        href: "/dashboard/settings/faq",
        icon: <HelpCircle className="h-4 w-4" />,
      },
      {
        title: "About",
        href: "/dashboard/settings/about",
        icon: <Info className="h-4 w-4" />,
      },
      {
        title: "Terms & Policies",
        href: "/dashboard/settings/terms",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        title: "Report a Problem",
        href: "/dashboard/settings/report",
        icon: <HelpCircle className="h-4 w-4" />,
      },
    ],
  },
]

export function CollapsibleSidebar() {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)

  // Check if current path is in settings submenu to auto-expand
  useEffect(() => {
    if (pathname.includes("/settings")) {
      setOpenSubmenu("Settings")
    }
  }, [pathname])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const isChildActive = (item: NavItem) => {
    if (!item.children) return false
    return item.children.some((child) => isActive(child.href))
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden h-screen flex-col border-r bg-background/80 transition-all duration-300 md:flex",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          {!collapsed && <span className="text-lg font-semibold">Octomations</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(collapsed && "mx-auto")}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronDown className={cn("h-5 w-5 transition-transform", collapsed && "-rotate-90")} />
          </Button>
        </div>
        <nav className={cn("flex flex-col gap-1 p-2", collapsed && "items-center")}>
          {navItems.map((item, index) => (
            <div key={index} className="w-full">
              {item.submenu && !collapsed ? (
                <div className="w-full">
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-4 py-2 transition-colors",
                      isActive(item.href) || isChildActive(item)
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                    aria-expanded={openSubmenu === item.title}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", openSubmenu === item.title && "rotate-180")}
                    />
                  </button>
                  {openSubmenu === item.title && item.children && (
                    <div className="mt-1 space-y-1 pl-6">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors",
                            isActive(child.href)
                              ? "border-l-2 border-[#2be0bc] bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        >
                          {child.icon}
                          <span>{child.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.submenu && collapsed ? item.children?.[0].href || "#" : item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-4 py-2 transition-colors",
                    collapsed ? "justify-center px-2" : "",
                    isActive(item.href) || (item.submenu && isChildActive(item))
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="ml-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0 sm:w-[300px]">
          <div className="flex h-14 items-center border-b px-4">
            <span className="text-lg font-semibold">Octomations CRM</span>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item, index) => (
              <div key={index} className="w-full">
                {item.submenu ? (
                  <div className="w-full">
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-4 py-2 transition-colors",
                        isActive(item.href) || isChildActive(item)
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                      aria-expanded={openSubmenu === item.title}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", openSubmenu === item.title && "rotate-180")}
                      />
                    </button>
                    {openSubmenu === item.title && item.children && (
                      <div className="mt-1 space-y-1 pl-6">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors",
                              isActive(child.href)
                                ? "border-l-2 border-[#2be0bc] bg-muted font-medium text-foreground"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                            )}
                          >
                            {child.icon}
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-4 py-2 transition-colors",
                      isActive(item.href)
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
