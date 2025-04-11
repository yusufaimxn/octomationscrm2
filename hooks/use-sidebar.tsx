"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextProps {
  isOpen: boolean
  isCollapsed: boolean
  toggleSidebar: () => void
  toggleCollapse: () => void
}

const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  isCollapsed: false,
  toggleSidebar: () => {},
  toggleCollapse: () => {},
})

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check for saved preference in localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebar-collapsed")
    if (savedCollapsed) {
      setIsCollapsed(savedCollapsed === "true")
    }
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  return (
    <SidebarContext.Provider value={{ isOpen, isCollapsed, toggleSidebar, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
