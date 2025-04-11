"use client"

import { useTheme } from "@/contexts/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ButtonPrimary, ButtonDanger, ButtonNeutral } from "@/components/ui/custom-buttons"
import { Sun, Moon, Laptop } from "lucide-react"

export default function ThemeDemoPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Theme System Demo</h1>
        <p className="text-muted-foreground">Demonstration of the Octomations theme system and custom components</p>
      </div>

      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</CardTitle>
          <CardDescription>Change the theme using the buttons below or the toggle in the navbar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <ButtonPrimary onClick={() => setTheme("light")} className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Light Mode
            </ButtonPrimary>
            <ButtonDanger onClick={() => setTheme("dark")} className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Dark Mode
            </ButtonDanger>
            <ButtonNeutral onClick={() => setTheme("system")} className="flex items-center gap-2">
              <Laptop className="h-4 w-4" />
              System Default
            </ButtonNeutral>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Custom Button Components</CardTitle>
          <CardDescription>Reusable button components with consistent styling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Primary Buttons (Turquoise)</h3>
              <div className="space-y-2">
                <ButtonPrimary>Primary Button</ButtonPrimary>
                <ButtonPrimary disabled>Disabled</ButtonPrimary>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Danger Buttons (Red)</h3>
              <div className="space-y-2">
                <ButtonDanger>Danger Button</ButtonDanger>
                <ButtonDanger disabled>Disabled</ButtonDanger>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Neutral Buttons (Grey)</h3>
              <div className="space-y-2">
                <ButtonNeutral>Neutral Button</ButtonNeutral>
                <ButtonNeutral disabled>Disabled</ButtonNeutral>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Theme Colors</CardTitle>
          <CardDescription>Color palette for the current theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 w-full rounded-xl bg-background border"></div>
              <p className="text-sm font-medium">Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 w-full rounded-xl bg-octored"></div>
              <p className="text-sm font-medium">Octomations Red</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 w-full rounded-xl bg-turquoise"></div>
              <p className="text-sm font-medium">Turquoise</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 w-full rounded-xl bg-muted"></div>
              <p className="text-sm font-medium">Muted</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
