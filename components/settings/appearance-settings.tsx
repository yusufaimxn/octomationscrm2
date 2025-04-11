"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sun, Moon, Monitor } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/contexts/theme-context"

export function AppearanceSettings() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#e63327")
  const [font, setFont] = useState("open-sauce")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Appearance settings saved",
      description: "Your appearance preferences have been updated successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your Octomations dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                    theme === "light" ? "border-[#2be0bc] bg-[#2be0bc]/5" : "border-transparent hover:border-muted"
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <div className="h-20 w-20 rounded-xl bg-white border flex items-center justify-center">
                    <Sun className="h-10 w-10 text-[#e63327]" />
                  </div>
                  <p className="text-sm font-medium">Light</p>
                </div>

                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                    theme === "dark" ? "border-[#2be0bc] bg-[#2be0bc]/5" : "border-transparent hover:border-muted"
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <div className="h-20 w-20 rounded-xl bg-slate-950 border flex items-center justify-center">
                    <Moon className="h-10 w-10 text-[#e63327]" />
                  </div>
                  <p className="text-sm font-medium">Dark</p>
                </div>

                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                    theme === "system" ? "border-[#2be0bc] bg-[#2be0bc]/5" : "border-transparent hover:border-muted"
                  }`}
                  onClick={() => setTheme("system")}
                >
                  <div className="h-20 w-20 rounded-xl bg-gradient-to-b from-white to-slate-950 border flex items-center justify-center">
                    <Monitor className="h-10 w-10 text-[#e63327]" />
                  </div>
                  <p className="text-sm font-medium">System</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Primary Color</h3>
              <div className="flex flex-wrap gap-3">
                {["#e63327", "#2be0bc", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316"].map((color) => (
                  <div
                    key={color}
                    className={`h-10 w-10 rounded-full cursor-pointer transition-all ${
                      primaryColor === color
                        ? "ring-2 ring-offset-2 ring-offset-background ring-[#2be0bc]"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setPrimaryColor(color)}
                  />
                ))}
                <div className="relative h-10">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center h-10 w-10 rounded-full border border-dashed">
                    <span className="text-xs">+</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Current color: {primaryColor}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font">Font Selection</Label>
              <Select value={font} onValueChange={setFont}>
                <SelectTrigger id="font" className="rounded-lg focus:ring-2 focus:ring-[#2be0bc] focus:ring-offset-0">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open-sauce">Open Sauce</SelectItem>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">This will change the font across your dashboard</p>
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
              "Save Preferences"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
