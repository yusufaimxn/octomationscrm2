import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the current URL path
  const path = request.nextUrl.pathname

  // Temporarily disabled auth protection
  console.warn("⚠️ Middleware auth check disabled for development mode")

  // --- Disabled for now ---
  // const isProtectedRoute = 
  //   path.startsWith("/dashboard") || 
  //   path.startsWith("/clients") || 
  //   path.startsWith("/profile")

  // if (isProtectedRoute && !session) {
  //   const redirectUrl = new URL("/login", request.url)
  //   redirectUrl.searchParams.set("redirectedFrom", path)
  //   return NextResponse.redirect(redirectUrl)
  // }

  // If logged in and trying to access auth pages
  const isAuthRoute = path === "/login" || path === "/signup"
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return res
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
