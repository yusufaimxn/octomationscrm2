export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About Octomations</h1>
        <p className="mt-2 text-muted-foreground">Learn more about our platform and mission.</p>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-sm">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-primary/20 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full text-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        <h2 className="mb-4 text-center text-2xl font-bold">What is Octomations?</h2>

        <div className="space-y-4 text-muted-foreground">
          <p>
            Octomations is an all-in-one modular marketing automation platform designed to help small businesses grow
            with AI tools, automation, and CRM integration.
          </p>

          <p>
            Our mission is to empower businesses of all sizes with enterprise-grade marketing tools that are accessible,
            affordable, and easy to use. We believe that effective marketing automation should not be limited to large
            corporations with big budgets.
          </p>

          <p>
            With Octomations, you can manage your client relationships, automate marketing campaigns across multiple
            channels, and leverage AI to optimize your messaging and targeting. Our platform integrates seamlessly with
            popular communication channels including email, SMS, WhatsApp, and social media.
          </p>

          <p>
            Founded in 2023, Octomations has helped thousands of businesses streamline their marketing efforts, increase
            customer engagement, and drive growth through intelligent automation.
          </p>

          <div className="mt-8 rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-semibold">Our Core Values</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Simplicity in complexity</li>
              <li>Continuous innovation</li>
              <li>Customer-centric approach</li>
              <li>Data privacy and security</li>
              <li>Accessibility for businesses of all sizes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
