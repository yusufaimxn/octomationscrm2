import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function Home() {
  let isLoggedIn = false

  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase.auth.getSession()
    isLoggedIn = !!data.session
  } catch (error) {
    console.error("Error checking auth session:", error)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link className="flex items-center" href="/">
          <span className="text-2xl font-bold text-octored">Octomations</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
          {isLoggedIn ? (
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
              Login
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Automate Your Marketing with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Octomations helps you create, manage, and optimize your marketing campaigns with the power of AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
                    <Button className="bg-turquoise text-black font-medium rounded-2xl shadow-md p-3 transition-all duration-200 hover:scale-105 hover:shadow-glow">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="bg-secondary text-foreground font-medium rounded-2xl shadow-md p-3 transition-all duration-200 hover:scale-105 hover:bg-muted"
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Marketing Automation"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  src="/interconnected-marketing-flow.png"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform provides everything you need to automate your marketing efforts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    className=" h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M12 8v1" />
                    <path d="M12 15v1" />
                    <path d="M16 12h-1" />
                    <path d="M9 12H8" />
                    <path d="m15 9-0.86 0.86" />
                    <path d="m9.86 14.14-0.86 0.86" />
                    <path d="m15 15-0.86-0.86" />
                    <path d="m9.86 9.86-0.86-0.86" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">AI-Powered Automation</h3>
                <p className="text-center text-muted-foreground">
                  Leverage the power of AI to automate your marketing campaigns and workflows.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    className=" h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Campaign Management</h3>
                <p className="text-center text-muted-foreground">
                  Create, manage, and track your marketing campaigns from a single dashboard.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    className=" h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Analytics & Reporting</h3>
                <p className="text-center text-muted-foreground">
                  Get detailed insights and reports on your marketing performance.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    className=" h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Customer Relationship Management</h3>
                <p className="text-center text-muted-foreground">
                  Manage your customer relationships and interactions all in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    className=" h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Multi-Channel Marketing</h3>
                <p className="text-center text-muted-foreground">
                  Reach your customers across multiple channels including email, social media, and more.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <svg
                    className=" h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                    <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
                    <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Content Management</h3>
                <p className="text-center text-muted-foreground">
                  Create, store, and manage your marketing content with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Testimonials</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See what our customers are saying about Octomations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "Octomations has completely transformed our marketing efforts. The AI-powered automation has saved
                    us countless hours and increased our ROI significantly."
                  </p>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <div className="rounded-full bg-muted p-1">
                    <svg
                      className=" h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Marketing Director, TechCorp</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "The customer relationship management features in Octomations have helped us build stronger
                    connections with our clients. It's an essential tool for our business."
                  </p>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <div className="rounded-full bg-muted p-1">
                    <svg
                      className=" h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-muted-foreground">CEO, GrowthLabs</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "The analytics and reporting features have given us insights we never had before. We can now make
                    data-driven decisions that have improved our campaign performance."
                  </p>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <div className="rounded-full bg-muted p-1">
                    <svg
                      className=" h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emily Rodriguez</p>
                    <p className="text-xs text-muted-foreground">Marketing Manager, Retail Plus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 Octomations. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
