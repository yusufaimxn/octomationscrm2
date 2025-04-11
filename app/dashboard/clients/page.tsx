import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { ClientDate } from "@/components/clients/client-date"

export default async function ClientsPage() {
  const supabase = createServerSupabaseClient()

  const { data: clients, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching clients:", error)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <Button asChild>
          <Link href="/dashboard/clients/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground">Manage your client relationships and contact information.</p>

      <DataTable columns={columns} data={clients || []} />
    </div>
  )
}
