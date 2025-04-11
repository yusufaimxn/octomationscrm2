"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Loader2, User, Link2, Shield, AlertCircle, Check } from "lucide-react"
import { ProfileDropzone } from "@/components/clients/profile-dropzone"

// Form validation schema for personal info
const personalInfoSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).optional(),
  bio: z.string().optional(),
})

// Form validation schema for social links
const socialLinksSchema = z.object({
  instagram: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  facebook: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  linkedin: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
})

// Form validation schema for security
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

export default function ProfilePage() {
  const { toast } = useToast()
  const supabase = getSupabaseBrowser()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Personal info form
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    setValue: setValuePersonal,
    formState: { errors: errorsPersonal, isSubmitting: isSubmittingPersonal },
    reset: resetPersonal,
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      username: "",
      bio: "",
    },
  })

  // Social links form
  const {
    register: registerSocial,
    handleSubmit: handleSubmitSocial,
    setValue: setValueSocial,
    formState: { errors: errorsSocial, isSubmitting: isSubmittingSocial },
    reset: resetSocial,
  } = useForm<SocialLinksValues>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    },
  })

  // Security form
  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: errorsSecurity, isSubmitting: isSubmittingSecurity },
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
    async function fetchUserData() {
      try {
        setIsLoading(true)
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError || !session) {
          console.error("Error fetching session:", sessionError)
          return
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          console.error("Error fetching profile:", profileError)
          return
        }

        setUserData({
          ...session.user,
          ...profileData,
        })

        // Set form values
        setValuePersonal("full_name", profileData.full_name || "")
        setValuePersonal("email", session.user.email || "")
        setValuePersonal("phone", profileData.phone || "")
        setValuePersonal("username", profileData.username || "")
        setValuePersonal("bio", profileData.bio || "")

        setValueSocial("instagram", profileData.instagram_url || "")
        setValueSocial("facebook", profileData.facebook_url || "")
        setValueSocial("twitter", profileData.twitter_url || "")
        setValueSocial("linkedin", profileData.linkedin_url || "")

        // Set profile picture preview if available
        if (profileData.avatar_url) {
          setProfilePreview(profileData.avatar_url)
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [supabase, setValuePersonal, setValueSocial])

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
      setIsUpdating(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to update your profile",
          variant: "destructive",
        })
        return
      }

      // Update profile in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.full_name,
          phone: data.phone || null,
          username: data.username || null,
          bio: data.bio || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id)

      if (error) {
        throw error
      }

      // Upload profile picture if changed
      if (profilePicture) {
        const fileExt = profilePicture.name.split(".").pop()
        const filePath = `avatars/${session.user.id}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, profilePicture, { upsert: true })

        if (uploadError) {
          throw uploadError
        }

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

      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully",
      })
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error updating profile",
        description: error.message || "An error occurred while updating your profile",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle social links update
  const onSubmitSocialLinks = async (data: SocialLinksValues) => {
    try {
      setIsUpdating(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to update your profile",
          variant: "destructive",
        })
        return
      }

      // Update social links in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          instagram_url: data.instagram || null,
          facebook_url: data.facebook || null,
          twitter_url: data.twitter || null,
          linkedin_url: data.linkedin || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id)

      if (error) {
        throw error
      }

      toast({
        title: "Social links updated",
        description: "Your social media links have been updated successfully",
      })
    } catch (error: any) {
      console.error("Error updating social links:", error)
      toast({
        title: "Error updating social links",
        description: error.message || "An error occurred while updating your social links",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle password update
  const onSubmitSecurity = async (data: SecurityValues) => {
    try {
      setIsUpdating(true)

      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: data.new_password,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      })

      // Reset form
      resetSecurity()
    } catch (error: any) {
      console.error("Error updating password:", error)
      toast({
        title: "Error updating password",
        description: error.message || "An error occurred while updating your password",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            <span className="hidden sm:inline">Account Security</span>
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
                          disabled={isUpdating}
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
                        <Input
                          id="email"
                          type="email"
                          {...registerPersonal("email")}
                          className={errorsPersonal.email ? "border-red-500" : ""}
                          disabled={true} // Email can't be changed directly
                        />
                        {errorsPersonal.email && (
                          <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errorsPersonal.email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          {...registerPersonal("phone")}
                          className={errorsPersonal.phone ? "border-red-500" : ""}
                          disabled={isUpdating}
                        />
                        {errorsPersonal.phone && (
                          <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errorsPersonal.phone.message}
                          </p>
                        )}
                      </div>

                      {/* Username */}
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          {...registerPersonal("username")}
                          className={errorsPersonal.username ? "border-red-500" : ""}
                          disabled={isUpdating}
                        />
                        {errorsPersonal.username && (
                          <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errorsPersonal.username.message}
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
                        disabled={isUpdating}
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
                      <p className="text-sm font-medium">{userData?.id || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date Joined</p>
                      <p className="text-sm font-medium">
                        {userData?.created_at
                          ? new Date(userData.created_at).toLocaleDateString("en-US", {
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
                <Button type="button" variant="outline" onClick={() => resetPersonal()} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
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
                      disabled={isUpdating}
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
                      disabled={isUpdating}
                    />
                  </div>
                  {errorsSocial.facebook && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSocial.facebook.message}
                    </p>
                  )}
                </div>

                {/* Twitter */}
                <div className="space-y-2">
                  <Label htmlFor="twitter">X (Twitter)</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      twitter.com/
                    </span>
                    <Input
                      id="twitter"
                      placeholder="username"
                      {...registerSocial("twitter")}
                      className={`rounded-l-none ${errorsSocial.twitter ? "border-red-500" : ""}`}
                      disabled={isUpdating}
                    />
                  </div>
                  {errorsSocial.twitter && (
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errorsSocial.twitter.message}
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
                      disabled={isUpdating}
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
                <Button type="button" variant="outline" onClick={() => resetSocial()} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
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

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your password and account security settings</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitSecurity(onSubmitSecurity)}>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div className="space-y-2">
                      <Label htmlFor="current_password">Current Password</Label>
                      <Input
                        id="current_password"
                        type="password"
                        {...registerSecurity("current_password")}
                        className={errorsSecurity.current_password ? "border-red-500" : ""}
                        disabled={isUpdating}
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
                        disabled={isUpdating}
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
                        disabled={isUpdating}
                      />
                      {errorsSecurity.confirm_password && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errorsSecurity.confirm_password.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button type="button" variant="outline" disabled>
                    Enable 2FA (Coming Soon)
                  </Button>
                </div>

                {/* Session Management */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                  <div className="bg-muted/50 p-4 rounded-md mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                        <Check className="mr-1 h-3 w-3" />
                        Active
                      </span>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10">
                    Sign Out All Devices
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => resetSecurity()} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
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
