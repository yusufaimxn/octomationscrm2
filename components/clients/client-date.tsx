"use client"

import { useHasMounted } from "@/lib/hooks/useHasMounted"

interface ClientDateProps {
  date: string | Date
  format?: "short" | "long"
}

export function ClientDate({ date, format = "short" }: ClientDateProps) {
  const hasMounted = useHasMounted()
  const dateObj = new Date(date)

  if (!hasMounted) {
    return <span className="text-muted-foreground">Loading...</span>
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: format === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(dateObj)

  return <span>{formattedDate}</span>
} 