export default function TermsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Terms & Policies</h1>
        <p className="mt-2 text-muted-foreground">Please review our terms of service and policies.</p>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-sm">
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Terms of Service</h2>
            <p className="mb-4 text-muted-foreground">
              By using Octomations, you agree to these terms. Please read them carefully.
            </p>
            <p className="mb-4 text-muted-foreground">Last updated: April 10, 2023</p>
            <p className="text-muted-foreground">
              These Terms of Service ("Terms") govern your access to and use of Octomations ("we" or "our") websites,
              services, and applications (collectively, the "Services"). By accessing or using the Services, you agree
              to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">1. Account Registration</h2>
            <p className="text-muted-foreground">
              To use certain features of the Services, you must register for an account. When you register, you agree to
              provide accurate, current, and complete information about yourself. You are responsible for safeguarding
              your password and for all activities that occur under your account. You agree to notify us immediately of
              any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">2. Data Privacy</h2>
            <p className="text-muted-foreground">
              Our Privacy Policy explains how we collect, use, and share information about you when you use our
              Services. By using our Services, you consent to our collection, use, and sharing of information as
              described in our Privacy Policy.
            </p>
            <p className="mt-4 text-muted-foreground">
              We take data privacy seriously and comply with applicable data protection laws, including GDPR and CCPA.
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">3. User Responsibility</h2>
            <p className="text-muted-foreground">
              You are responsible for all content and activity that occurs under your account. You agree not to use the
              Services for any illegal purpose or in violation of any applicable local, state, national, or
              international law. You agree not to violate or infringe other people's rights, including privacy,
              publicity, and intellectual property rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">4. Subscription and Billing</h2>
            <p className="text-muted-foreground">
              Some of our Services require payment. If you subscribe to a paid plan, you agree to pay the fees
              associated with the plan you choose. We may change our fees at any time, but will give you advance notice
              before changes apply to you. If you don't pay on time or if the payment method you provide cannot be
              charged, we reserve the right to suspend or terminate your access to the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The Services and all content and materials included on the Services, including, but not limited to, text,
              graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software,
              are the property of Octomations or its licensors and are protected by copyright, trademark, and other
              intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, in no event shall Octomations, its affiliates, officers,
              directors, employees, or agents be liable for any indirect, punitive, incidental, special, consequential,
              or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or
              other intangible losses, that result from the use of, or inability to use, the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold">7. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your account and access to the Services at any time, without prior notice or
              liability, for any reason, including if you breach these Terms. Upon termination, your right to use the
              Services will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">8. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these Terms from time to time. If we make changes, we will provide notice of such changes,
              such as by sending an email notification, providing notice through the Services, or updating the date at
              the top of these Terms. Your continued use of the Services after the effective date of the revised Terms
              constitutes your acceptance of the Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
