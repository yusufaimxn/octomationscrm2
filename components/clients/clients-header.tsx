"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ClientsHeaderProps {
  onSearch?: (query: string) => void
  onFilterStatus?: (status: string) => void
  onFilterSource?: (source: string) => void
}

export function ClientsHeader({ onSearch, onFilterStatus, onFilterSource }: ClientsHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const statusOptions = ["All", "Active", "Inactive", "Follow-up", "Closed"]
  const sourceOptions = ["All", "WhatsApp", "Facebook", "Email", "Referral", "Other"]

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter clients</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {statusOptions.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => onFilterStatus && onFilterStatus(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {sourceOptions.map((source) => (
                  <DropdownMenuItem key={source} onClick={() => onFilterSource && onFilterSource(source)}>
                    {source}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="bg-[#2be0bc] text-black hover:bg-[#2be0bc]/90">
            <Link href="/clients/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Client
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
