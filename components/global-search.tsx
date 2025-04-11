"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Search } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "LayoutDashboard",
      description: "Your main overview page",
    },
    {
      title: "Clients",
      href: "/clients",
      icon: "Users",
      description: "Manage your client relationships",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "Settings",
      description: "Adjust your account preferences",
    },
    {
      title: "Pricing",
      href: "/pricing",
      icon: "CreditCard",
      description: "View and upgrade your plan",
    },
    {
      title: "Contact",
      href: "/contact",
      icon: "Mail",
      description: "Get in touch with our support team",
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-start rounded-2xl pl-3 text-sm font-medium md:w-[300px]"
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Search...</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start" forceMount>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    router.push(item.href)
                    setOpen(false)
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
