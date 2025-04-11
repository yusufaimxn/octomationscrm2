export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company?: string | null
  status: string
  notes?: string | null
  created_at: string
  updated_at?: string
}

export interface NewClient {
  name: string
  email: string
  phone: string
  company?: string | null
  status: string
  notes?: string | null
}
