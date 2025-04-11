"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase-client"
import { Loader2, User, Link2, Shield, AlertCircle, Info } from "lucide-react"
import { ProfileDropzone } from "@/components/clients/profile-dropzone"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Form validation schemas
const personalInfoSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
})

const socialLinksSchema = z.object({
  instagram: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  facebook: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  tiktok: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  linkedin: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
})

const securitySchema = z
  .object({
    current_password: z.string().min(1, { message: "Current password is required" }),
    new_password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

type PersonalInfoValues = z.infer<typeof personalInfoSchema>
type SocialLinksValues = z.infer<typeof socialLinksSchema>
type SecurityValues = z.infer<typeof securitySchema>

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [demoMode, setDemoMode] = useState(false)

  // Personal info form
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    setValue: setValuePersonal,
    formState: { errors: errorsPersonal },
    reset: resetPersonal,
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
    },
  })

  // Social links form
  const {
    register: registerSocial,
    handleSubmit: handleSubmitSocial,
    setValue: setValueSocial,
    formState: { errors: errorsSocial },
    reset: resetSocial,
  } = useForm<SocialLinksValues>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      instagram: "",
      facebook: "",
      tiktok: "",
      linkedin: "",
    },
  })

  // Security form
  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: errorsSecurity },
    reset: resetSecurity,
  } = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  // Fetch user data
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)

        // Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          setDemoMode(true)

          // Set demo data
          const demoUser = {
            id: "demo-user-id",
            email: "demo@example.com",
            created_at: new Date().toISOString(),
            full_name: "Demo User",
            phone: "555-123-4567",
            location: "Demo City",
            bio: "This is a demo profile since the profiles table doesn't exist in your database yet.",
          }

          setUser(demoUser)
          setValuePersonal("full_name", demoUser.full_name)
          setValuePersonal("email", demoUser.email)
          setValuePersonal("phone", demoUser.phone)
          setValuePersonal("location", demoUser.location)
          setValuePersonal("bio", demoUser.bio)

          return
        }

        if (!session) {
          // Handle not logged in state
          setDemoMode(true)

          const demoUser = {
            id: "demo-user-id",
            email: "demo@example.com",
            created_at: new Date().toISOString(),
            full_name: "Demo User",
            phone: "555-123-4567",
            location: "Demo City",
            bio: "This is a demo profile. Please log in to see your actual profile.",
          }

          setUser(demoUser)
          setValuePersonal("full_name", demoUser.full_name)
          setValuePersonal("email", demoUser.email)
          setValuePersonal("phone", demoUser.phone)
          setValuePersonal("location", demoUser.location)
          setValuePersonal("bio", demoUser.bio)

          return
        }

        // Try to fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          // Check if error is due to missing profile
          if (profileError.code === "PGRST116") {
            // Profile doesn't exist, try to create it
            const { data: newProfile, error: insertError } = await supabase
              .from("profiles")
              .insert([
                {
                  id: session.user.id,
                  email: session.user.email,
                  full_name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              ])
              .select()
              .single()

            if (insertError) {
              // If insert fails, fall back to demo mode silently
              console.log("Profile not found and could not be created, falling back to demo mode")
              setDemoMode(true)
              
              const demoUser = {
                id: session.user.id,
                email: session.user.email,
                created_at: session.user.created_at,
                full_name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
                phone: "Not set",
                location: "Not set",
                bio: "This is a demo profile since the profiles table doesn't exist in your database yet.",
              }

              setUser(demoUser)
              setValuePersonal("full_name", demoUser.full_name)
              setValuePersonal("email", demoUser.email)
              setValuePersonal("phone", demoUser.phone)
              setValuePersonal("location", demoUser.location)
              setValuePersonal("bio", demoUser.bio)
            } else {
              // Use the newly created profile
              setUser(newProfile)
              setValuePersonal("full_name", newProfile.full_name || "")
              setValuePersonal("email", session.user.email || "")
              setValuePersonal("phone", newProfile.phone || "")
              setValuePersonal("location", newProfile.location || "")
              setValuePersonal("bio", newProfile.bio || "")
            }
          } else {
            // Other error, fall back to demo mode silently
            console.log("Error fetching profile, falling back to demo mode")
            setDemoMode(true)
            
            const demoUser = {
              id: session.user.id,
              email: session.user.email,
              created_at: session.user.created_at,
              full_name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
              phone: "Not set",
              location: "Not set",
              bio: "This is a demo profile since the profiles table doesn't exist in your database yet.",
            }

            setUser(demoUser)
            setValuePersonal("full_name", demoUser.full_name)
            setValuePersonal("email", demoUser.email)
            setValuePersonal("phone", demoUser.phone)
            setValuePersonal("location", demoUser.location)
            setValuePersonal("bio", demoUser.bio)
          }
          return
        }

        // If we have a profile, use it
        if (profileData) {
          setUser(profileData)
          setValuePersonal("full_name", profileData.full_name || "")
          setValuePersonal("email", session.user.email || "")
          setValuePersonal("phone", profileData.phone || "")
          setValuePersonal("location", profileData.location || "")
          setValuePersonal("bio", profileData.bio || "")
        }
      } catch (error: any) {
        console.error("Error in fetchUser:", error?.message || "Unknown error occurred")
        setDemoMode(true)
        
        // Set fallback demo data
        const demoUser = {
          id: "demo-user-id",
          email: "demo@example.com",
          created_at: new Date().toISOString(),
          full_name: "Demo User",
          phone: "555-123-4567",
          location: "Demo City",
          bio: "This is a demo profile due to an error loading your profile.",
        }

        setUser(demoUser)
        setValuePersonal("full_name", demoUser.full_name)
        setValuePersonal("email", demoUser.email)
        setValuePersonal("phone", demoUser.phone)
        setValuePersonal("location", demoUser.location)
        setValuePersonal("bio", demoUser.bio)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Handle profile picture change
  const handleProfilePictureChange = (file: File | null) => {
    setProfilePicture(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle profile picture removal
  const handleRemoveProfilePicture = () => {
    setProfilePicture(null)
    setProfilePreview(null)
  }

  // Handle personal info update
  const onSubmitPersonalInfo = async (data: PersonalInfoValues) => {
    try {
      setUpdating(true)

      if (demoMode) {
        // In demo mode, just simulate a successful update
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

        // Update local state
        setUser((prev) => ({
          ...prev,
          full_name: data.full_name,
          phone: data.phone,
          location: data.location,
          bio: data.bio,
        }))

        toast.success("Personal information updated successfully! (Demo Mode)")
        return
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        toast.error("You must be logged in to update your profile")
        return
      }

      try {
        // Try to update profile in Supabase
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: data.full_name,
            phone: data.phone || null,
            location: data.location || null,
            bio: data.bio || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", session.user.id)

        if (error) {
          // If the profiles table doesn't exist
          console.error("Error updating profile:", error)
          toast.error("Profile update failed: The profiles table doesn't exist in your database")
          return
        }

        // Upload profile picture if changed
        if (profilePicture) {
          const fileExt = profilePicture.name.split(".").pop()
          const filePath = `avatars/${session.user.id}.${fileExt}`

          try {
            const { error: uploadError } = await supabase.storage
              .from("avatars")
              .upload(filePath, profilePicture, { upsert: true })

            if (uploadError) {
              console.error("Error uploading avatar:", uploadError)
              toast.error("Failed to upload profile picture")
            } else {
              // Get public URL
              const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath)

              // Update profile with avatar URL
              await supabase
                .from("profiles")
                .update({
                  avatar_url: publicUrlData.publicUrl,
                })
                .eq("id", session.user.id)
            }
          } catch (error) {
            console.error("Avatar upload error:", error)
            toast.error("Failed to upload profile picture")
          }
        }

        toast.success("Personal information updated successfully!")
      } catch (error) {
        console.error("Profile update error:", error)
        toast.error("Failed to update profile")
      }
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast.error(error.message || "Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  // Handle social links update
  const onSubmitSocialLinks = async (data: SocialLinksValues) => {
    try {
      setUpdating(true)

      if (demoMode) {
        // In demo mode, just simulate a successful update
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        toast.success("Social links updated successfully! (Demo Mode)")
        return
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        toast.error("You must be logged in to update your profile")
        return
      }

      try {
        // Update social links in Supabase
        const { error } = await supabase
          .from("profiles")
          .update({
            instagram_url: data.instagram || null,
            facebook_url: data.facebook || null,
            tiktok_url: data.tiktok || null,
            linkedin_url: data.linkedin || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", session.user.id)

        if (error) {
          console.error("Error updating social links:", error)
          toast.error("Social links update failed: The profiles table doesn't exist in your database")
          return
        }

        toast.success("Social links updated successfully!")
      } catch (error) {
        console.error("Social links update error:", error)
        toast.error("Failed to update social links")
      }
    } catch (error: any) {
      console.error("Error updating social links:", error)
      toast.error(error.message || "Failed to update social links")
    } finally {
      setUpdating(false)
    }
  }

  // Handle password update
  const onSubmitSecurity = async (data: SecurityValues) => {
    try {
      setUpdating(true)

      if (demoMode) {
        // In demo mode, just simulate a successful update
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        toast.success("Password updated successfully! (Demo Mode)")
        resetSecurity()
        return
      }

      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: data.new_password,
      })

      if (error) {
        throw error
      }

      toast.success("Password updated successfully!")
      resetSecurity()
    } catch (error: any) {
      console.error("Error updating password:", error)
      toast.error(error.message || "Failed to update password")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">My Account</h2>
        <p className="text-muted-foreground">Manage your personal information and account settings</p>
      </div>

      {demoMode && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Demo Mode Active</AlertTitle>
          <AlertDescription>
            The "profiles" table doesn't exist in your Supabase database. This page is running in demo mode, and changes
            won't be saved. To fix this, create a "profiles" table in your Supabase database with the necessary columns.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personal Info</span>
            <span className="sm:hidden">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">Social Links</span>
            <span className="sm:hidden">Social</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
            <span className="sm:hidden">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile information</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitPersonal(onSubmitPersonalInfo)}>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {/* Profile Picture */}
                  <ProfileDropzone
                    initialImage={profilePreview}
                    onImageChange={handleProfilePictureChange}
                    onImageRemove={handleRemoveProfilePicture}
                  />

                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          {...registerPersonal("full_name")}
                          className={errorsPersonal.full_name ? "border-red-500" : ""}
                          disabled={updating}
                        />
                        {errorsPersonal.full_name && (
                          <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errorsPersonal.full_name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user?.email} disabled={true} className="bg-muted" />
                        <p className="text-xs text-muted-foreground">Email cannot be changed directly</p>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          {...registerPersonal("phone")}
                          className={errorsPersonal.phone ? "border-red-500" : ""}
                          disabled={updating}
                        />
                        {errorsPersonal.phone && (
                          <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errorsPersonal.phone.message}
                          </p>
                        )}
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          {...registerPersonal("location")}
                          className={errorsPersonal.location ? "border-red-500" : ""}
                          disabled={updating}
                        />
                        {errorsPersonal.location && (
                          <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errorsPersonal.location.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        {...registerPersonal("bio")}
                        className={`w-full min-h-[100px] px-3 py-2 border rounded-md ${
                          errorsPersonal.bio ? "border-red-500" : "border-input"
                        } bg-background`}
                        disabled={updating}
                      />
                      {errorsPersonal.bio && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errorsPersonal.bio.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium mb-2">Account Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Account ID</p>
                      <p className="text-sm font-medium">{user?.id || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date Joined</p>
                      <p className="text-sm font-medium">
                        {user?.created_at
                          ? new Date(user.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => resetPersonal()} disabled={updating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media accounts to your profile</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitSocial(onSubmitSocialLinks)}>
              <CardContent className="space-y-4">
                {/* Instagram */}
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      instagram.com/
                    </span>
                    <Input
                      id="instagram"
                      placeholder="username"
                      {...registerSocial("instagram")}
                      className={`rounded-l-none ${errorsSocial.instagram ? "border-red-500" : ""}`}
                      disabled={updating}
                    />
                  </div>
                  {errorsSocial.instagram && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSocial.instagram.message}
                    </p>
                  )}
                </div>

                {/* Facebook */}
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      facebook.com/
                    </span>
                    <Input
                      id="facebook"
                      placeholder="username"
                      {...registerSocial("facebook")}
                      className={`rounded-l-none ${errorsSocial.facebook ? "border-red-500" : ""}`}
                      disabled={updating}
                    />
                  </div>
                  {errorsSocial.facebook && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSocial.facebook.message}
                    </p>
                  )}
                </div>

                {/* TikTok */}
                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      tiktok.com/@
                    </span>
                    <Input
                      id="tiktok"
                      placeholder="username"
                      {...registerSocial("tiktok")}
                      className={`rounded-l-none ${errorsSocial.tiktok ? "border-red-500" : ""}`}
                      disabled={updating}
                    />
                  </div>
                  {errorsSocial.tiktok && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSocial.tiktok.message}
                    </p>
                  )}
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      linkedin.com/in/
                    </span>
                    <Input
                      id="linkedin"
                      placeholder="username"
                      {...registerSocial("linkedin")}
                      className={`rounded-l-none ${errorsSocial.linkedin ? "border-red-500" : ""}`}
                      disabled={updating}
                    />
                  </div>
                  {errorsSocial.linkedin && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSocial.linkedin.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => resetSocial()} disabled={updating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Update Social Links"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and account security</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitSecurity(onSubmitSecurity)}>
              <CardContent className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input
                    id="current_password"
                    type="password"
                    {...registerSecurity("current_password")}
                    className={errorsSecurity.current_password ? "border-red-500" : ""}
                    disabled={updating}
                  />
                  {errorsSecurity.current_password && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSecurity.current_password.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    {...registerSecurity("new_password")}
                    className={errorsSecurity.new_password ? "border-red-500" : ""}
                    disabled={updating}
                  />
                  {errorsSecurity.new_password && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSecurity.new_password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    {...registerSecurity("confirm_password")}
                    className={errorsSecurity.confirm_password ? "border-red-500" : ""}
                    disabled={updating}
                  />
                  {errorsSecurity.confirm_password && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSecurity.confirm_password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => resetSecurity()} disabled={updating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updating}>
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
