"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Save, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function PersonalInfoPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your personal information has been saved successfully.",
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 2MB.",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select a PNG or JPG image.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }, 1000)
  }

  const removeImage = () => {
    setProfileImage(null)
  }

  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                defaultValue="John"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                defaultValue="Doe"
                className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-lg",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select your date of birth"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start gap-4">
            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">Profile Picture</h3>
              <p className="text-xs text-muted-foreground mb-4">Upload a PNG or JPG image (max 2MB)</p>

              <div className="relative mx-auto">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-md bg-muted flex items-center justify-center">
                  {profileImage ? (
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-muted-foreground" />
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    </div>
                  )}
                </div>

                {profileImage && (
                  <button
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 bg-background dark:bg-slate-800 rounded-full p-1 shadow-md"
                    aria-label="Remove profile picture"
                  >
                    <X className="h-4 w-4 text-[#e63327]" />
                  </button>
                )}
              </div>

              <div className="mt-4">
                <Label htmlFor="picture" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Upload className="h-4 w-4" />
                    {profileImage ? "Change Picture" : "Upload Picture"}
                  </div>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
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

function User(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
