"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "@/components/settings/general-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { DataPrivacySettings } from "@/components/settings/data-privacy-settings"
import { AdminRoleSettings } from "@/components/settings/admin-role-settings"
import { LabsSettings } from "@/components/settings/labs-settings"
import { Settings, Bell, Palette, Shield, Database, Users, FlaskRoundIcon as Flask } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-7 h-auto p-1 rounded-xl bg-muted [&_[data-state=active]]:bg-[#2be0bc]/10 [&_[data-state=active]]:text-black">
          <TabsTrigger
            value="general"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">General</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background rounded-lg transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Notifications</span>
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background rounded-lg transition-colors"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Appearance</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background rounded-lg transition-colors"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="data-privacy"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background rounded-lg transition-colors"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Data & Privacy</span>
          </TabsTrigger>
          <TabsTrigger
            value="admin-roles"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background rounded-lg transition-colors"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Admin & Roles</span>
          </TabsTrigger>
          <TabsTrigger
            value="labs"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background rounded-lg transition-colors"
          >
            <Flask className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Labs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="data-privacy" className="space-y-6">
          <DataPrivacySettings />
        </TabsContent>

        <TabsContent value="admin-roles" className="space-y-6">
          <AdminRoleSettings />
        </TabsContent>

        <TabsContent value="labs" className="space-y-6">
          <LabsSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
