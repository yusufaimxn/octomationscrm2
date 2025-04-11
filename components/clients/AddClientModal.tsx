"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddClientModalProps {
  showModal: boolean
  onClose: () => void
  onSave: (client: ClientFormData) => void
}

interface ClientFormData {
  name: string
  email: string
  phone: string
  status: string
  notes: string
}

export function AddClientModal({ showModal, onClose, onSave }: AddClientModalProps) {
  // Animation state
  const [isVisible, setIsVisible] = useState(false)

  // Form state
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    notes: "",
  })

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle modal visibility
  useEffect(() => {
    if (showModal) {
      setIsVisible(true)
    } else {
      setTimeout(() => {
        setIsVisible(false)
      }, 300) // Match this with the transition duration
    }
  }, [showModal])

  // Reset form when modal closes
  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          status: "active",
          notes: "",
        })
        setErrors({})
        setIsSubmitting(false)
      }, 300)
    }
  }, [showModal])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      onSave(formData)
    } else {
      setIsSubmitting(false)
    }
  }

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isVisible && !showModal) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-300",
        showModal ? "opacity-100" : "opacity-0",
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl transition-all duration-300",
          showModal ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Add New Client</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Name <span className="text-[#e63327]">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white",
                  "focus:outline-none focus:ring-2 focus:ring-[#2be0bc] focus:border-transparent transition-colors",
                  errors.name && "border-red-500 focus:ring-red-500",
                )}
              />
              {errors.name && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Email <span className="text-[#e63327]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white",
                  "focus:outline-none focus:ring-2 focus:ring-[#2be0bc] focus:border-transparent transition-colors",
                  errors.email && "border-red-500 focus:ring-red-500",
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2be0bc] focus:border-transparent transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="status" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleSelectChange(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2be0bc] focus:border-transparent transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="notes" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2be0bc] focus:border-transparent transition-colors min-h-[100px] resize-y"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2be0bc] text-black font-medium rounded-2xl shadow-md p-3 transition-all duration-200 hover:scale-105 hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Saving..." : "Save Client"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-medium rounded-2xl shadow-md p-3 transition-all duration-200 hover:scale-105 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
