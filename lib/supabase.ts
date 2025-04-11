import { createBrowserClient } from "@supabase/ssr"

let supabaseBrowser: any = null

export function getSupabaseBrowser() {
  if (supabaseBrowser) {
    return supabaseBrowser
  }

  // Check if environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Supabase environment variables are missing!")
    console.warn("Using mock client. Authentication will not work.")

    // Return a mock client that won't crash the app
    supabaseBrowser = {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
        signInWithPassword: async () => ({ 
          data: { session: null, user: null }, 
          error: new Error("Supabase client not properly initialized - check environment variables") 
        }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            order: () => ({
              limit: () => ({
                then: (callback: any) => Promise.resolve(callback({ data: [], error: null })),
              }),
            }),
          }),
        }),
      }),
    } as any
    return supabaseBrowser
  }

  try {
    supabaseBrowser = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    console.log("Supabase client initialized successfully")
  } catch (error) {
    console.error("Error initializing Supabase client:", error)
    throw error
  }

  return supabaseBrowser
}
