"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Instagram, Facebook, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactInfoPage() {
  const { toast } = useToast()
  const [isPublic, setIsPublic] = useState(false)

  const handleSave = () => {
    toast({
      title: "Contact info updated",
      description: "Your contact information has been saved successfully.",
    })
  }

  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Update your contact details and social media profiles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value="john.doe@example.com" disabled className="rounded-lg bg-muted/50" />
            <p className="text-xs text-muted-foreground">This is the email you use to log in</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+60 12 345 6789"
              className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select defaultValue="my">
              <SelectTrigger id="country" className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="my">Malaysia</SelectItem>
                <SelectItem value="sg">Singapore</SelectItem>
                <SelectItem value="id">Indonesia</SelectItem>
                <SelectItem value="th">Thailand</SelectItem>
                <SelectItem value="ph">Philippines</SelectItem>
                <SelectItem value="vn">Vietnam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Kuala Lumpur"
              className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Social Media Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Instagram className="h-5 w-5 text-[#e63327]" />
              <Input
                placeholder="Instagram username"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>

            <div className="flex items-center gap-3">
              <Facebook className="h-5 w-5 text-[#e63327]" />
              <Input
                placeholder="Facebook profile"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>

            <div className="flex items-center gap-3">
              <Twitter className="h-5 w-5 text-[#e63327]" />
              <Input
                placeholder="X (Twitter) username"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>

            <div className="flex items-center gap-3">
              <TikTok className="h-5 w-5 text-[#e63327]" />
              <Input
                placeholder="TikTok username"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Privacy Settings</h3>
              <p className="text-sm text-muted-foreground">Control who can see your contact information</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isPublic} onCheckedChange={setIsPublic} className="data-[state=checked]:bg-[#2be0bc]" />
              <Label htmlFor="public-info" className="text-sm">
                {isPublic ? "Public" : "Private"}
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#2be0bc] hover:bg-[#22c9a8] hover:scale-105 text-black font-medium rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}

function TikTok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}
