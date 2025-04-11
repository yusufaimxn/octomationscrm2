"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FaqItem {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: "How do I add a client?",
    answer:
      "To add a client, navigate to the Clients tab in the dashboard and click on the 'Add New Client' button. Fill in the required information such as name, email, phone number, and company. Once completed, click 'Save' to add the client to your CRM.",
  },
  {
    question: "Can I automate WhatsApp follow-ups?",
    answer:
      "Yes, you can automate WhatsApp follow-ups using OctoSend. Go to the Automations section, select 'New Automation', choose WhatsApp as your channel, and set up your trigger events and message templates. You can schedule follow-ups based on client actions or specific time intervals.",
  },
  {
    question: "How do I create a marketing campaign?",
    answer:
      "To create a marketing campaign, go to the Campaigns section and click 'Create Campaign'. Define your target audience by selecting client segments, choose your communication channels (email, SMS, WhatsApp), design your message content, and set the campaign schedule. You can also track campaign performance through the Analytics dashboard.",
  },
  {
    question: "Can I integrate with other tools?",
    answer:
      "Octomations supports integration with various third-party tools and platforms. Go to Settings > Integrations to connect with popular services like Google Calendar, Zapier, Shopify, and more. For custom integrations, you can use our API documentation available in the developer section.",
  },
  {
    question: "How do I export client data?",
    answer:
      "To export client data, go to the Clients section, select the clients you wish to export (or click 'Select All'), then click the 'Export' button. You can choose between CSV, Excel, or PDF formats. The exported file will contain all client information including contact details, interaction history, and custom fields.",
  },
  {
    question: "What are the billing cycles?",
    answer:
      "Octomations offers both monthly and annual billing cycles. Annual subscriptions come with a 20% discount compared to monthly billing. You can manage your subscription, view invoices, and update payment methods in the Settings > Billing section of your dashboard.",
  },
]

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">Find answers to common questions about using Octomations CRM.</p>
      </div>

      <div className="space-y-4 rounded-2xl bg-card p-6 shadow-sm">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "rounded-lg border transition-all",
              openItems.includes(index) ? "bg-muted/50" : "bg-background",
            )}
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between px-4 py-4 text-left font-medium"
              aria-expanded={openItems.includes(index)}
            >
              {item.question}
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  openItems.includes(index) && "rotate-180",
                )}
              />
            </button>
            {openItems.includes(index) && (
              <div className="px-4 pb-4 pt-0 text-muted-foreground">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
