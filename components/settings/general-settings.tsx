"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function GeneralSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@octomations.com",
    companyName: "Octomations Inc.",
    website: "https://octomations.com",
    country: "us",
    language: "english",
    timezone: "utc-8",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>Update your personal and company information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                <SelectTrigger
                  id="country"
                  className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="br">Brazil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
                <SelectTrigger
                  id="language"
                  className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                >
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={formData.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
                <SelectTrigger
                  id="timezone"
                  className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
                >
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-12">UTC-12:00</SelectItem>
                  <SelectItem value="utc-11">UTC-11:00</SelectItem>
                  <SelectItem value="utc-10">UTC-10:00</SelectItem>
                  <SelectItem value="utc-9">UTC-09:00</SelectItem>
                  <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                  <SelectItem value="utc-7">UTC-07:00 (MST)</SelectItem>
                  <SelectItem value="utc-6">UTC-06:00 (CST)</SelectItem>
                  <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                  <SelectItem value="utc-4">UTC-04:00</SelectItem>
                  <SelectItem value="utc-3">UTC-03:00</SelectItem>
                  <SelectItem value="utc-2">UTC-02:00</SelectItem>
                  <SelectItem value="utc-1">UTC-01:00</SelectItem>
                  <SelectItem value="utc">UTC±00:00</SelectItem>
                  <SelectItem value="utc+1">UTC+01:00</SelectItem>
                  <SelectItem value="utc+2">UTC+02:00</SelectItem>
                  <SelectItem value="utc+3">UTC+03:00</SelectItem>
                  <SelectItem value="utc+4">UTC+04:00</SelectItem>
                  <SelectItem value="utc+5">UTC+05:00</SelectItem>
                  <SelectItem value="utc+5.5">UTC+05:30 (IST)</SelectItem>
                  <SelectItem value="utc+8">UTC+08:00</SelectItem>
                  <SelectItem value="utc+9">UTC+09:00</SelectItem>
                  <SelectItem value="utc+10">UTC+10:00</SelectItem>
                  <SelectItem value="utc+12">UTC+12:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
