"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { X, Upload, Save, RotateCcw } from "lucide-react"
import type { User } from "@/types/user"
import { Sidebar } from "@/components/profile/sidebar"
import { ProfileHeader } from "@/components/profile/profile-header"
import { TravelStats } from "@/components/profile/travel-stats"
import { RecentUploads } from "@/components/profile/recent-uploads"
import { TravelMap } from "@/components/profile/travel-map"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const [formData, setFormData] = useState<Partial<User>>({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    profilePhoto: null,
    coverPhoto: null,
    travelDestinations: [],
  })

  const [originalData, setOriginalData] = useState<Partial<User>>({})
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [newDestination, setNewDestination] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        
        const response = await fetch('/api/profile/get');
        if (!response.ok) throw new Error('Failed to fetch user data')
        
        const data = await response.json()

        setUserData(data)
        setFormData(data)
        setOriginalData(data)
        setProfilePhotoPreview(data.profilePhoto)
        setCoverPhotoPreview(data.coverPhoto)
        
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        toast.error("Failed to load profile data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)
    setHasUnsavedChanges(hasChanges)
  }, [formData, originalData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result as string)
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPhotoPreview(reader.result as string)
        setFormData((prev) => ({ ...prev, coverPhoto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddDestination = () => {
    if (newDestination.trim()) {
      setFormData((prev) => ({
        ...prev,
        travelDestinations: [...(prev.travelDestinations || []), newDestination.trim()],
      }))
      setNewDestination("")
      toast.success("Destination added")
    }
  }

  const handleRemoveDestination = (destination: string) => {
    setFormData((prev) => ({
      ...prev,
      travelDestinations: (prev.travelDestinations || []).filter((d) => d !== destination),
    }))
    toast.success("Destination removed")
  }

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true)

      if (!formData.username?.trim()) {
        toast.error("Username is required")
        return
      }

      if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
        toast.error("First name and last name are required")
        return
      }

      // TODO: API CALL - Upload images to Cloudinary first
      // let profilePhotoUrl = formData.profilePhoto
      // let coverPhotoUrl = formData.coverPhoto
      
      // if (profilePhotoPreview && profilePhotoPreview.startsWith('data:')) {
      //   const formDataObj = new FormData()
      //   const blob = await fetch(profilePhotoPreview).then(r => r.blob())
      //   formDataObj.append('file', blob)
      //   formDataObj.append('upload_preset', 'YOUR_UPLOAD_PRESET')
      //   
      //   const cloudinaryRes = await fetch(
      //     'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
      //     { method: 'POST', body: formDataObj }
      //   )
      //   const cloudinaryData = await cloudinaryRes.json()
      //   profilePhotoUrl = cloudinaryData.secure_url
      // }

      // if (coverPhotoPreview && coverPhotoPreview.startsWith('data:')) {
      //   const formDataObj = new FormData()
      //   const blob = await fetch(coverPhotoPreview).then(r => r.blob())
      //   formDataObj.append('file', blob)
      //   formDataObj.append('upload_preset', 'YOUR_UPLOAD_PRESET')
      //   
      //   const cloudinaryRes = await fetch(
      //     'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
      //     { method: 'POST', body: formDataObj }
      //   )
      //   const cloudinaryData = await cloudinaryRes.json()
      //   coverPhotoUrl = cloudinaryData.secure_url
      // }

      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDetails: {
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            bio: formData.bio,
            profilePhoto: "profilePhotoUrl",  // Cloudinary URL
            coverPhoto: "coverPhotoUrl",      // Cloudinary URL
            travelDestinations: formData.travelDestinations
          }
        }),
      })

      if(!response.ok) throw new Error('Failed to update profile')

      const { user } = await response.json();

      setUserData(user)
      setFormData(user)
      setOriginalData(formData)
      setShowEditDialog(false)

      toast.success("Profile updated successfully!")
      
    } catch (error) {
      console.error("Failed to save profile:", error)
      toast.error("Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowCancelDialog(true)
    } else {
      setShowEditDialog(false)
    }
  }

  const handleConfirmCancel = () => {
    setFormData(originalData)
    setProfilePhotoPreview(originalData.profilePhoto || null)
    setCoverPhotoPreview(originalData.coverPhoto || null)
    setShowEditDialog(false)
    setShowCancelDialog(false)
    toast.info("Changes discarded")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Profile Header */}
          <ProfileHeader 
            userData={userData}
            onEditClick={() => setShowEditDialog(true)} />

          {/* Main Content Area */}
          <div className="p-6 space-y-8">
            {/* Travel Stats Dashboard */}
            <TravelStats userData={userData} />

            {/* Recent Uploads and Travel Map */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentUploads userData={userData} />
              <TravelMap userData={userData} />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information and photos</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Cover Photo Upload */}
            <div className="space-y-2">
              <Label>Cover Photo</Label>
              <div className="relative h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg overflow-hidden group">
                {coverPhotoPreview && (
                  <img src={coverPhotoPreview} alt="Cover" className="w-full h-full object-cover" />
                )}
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-medium">Change Cover</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <div className="relative w-24 h-24 rounded-full overflow-hidden group bg-muted">
                {profilePhotoPreview ? (
                  <img src={profilePhotoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                    {formData.firstName?.[0]}{formData.lastName?.[0]}
                  </div>
                )}
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                    aria-label="Upload profile photo"
                  />
                  <Upload className="w-6 h-6 text-white" />
                </label>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={handleInputChange}
                placeholder="Username"
              />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio || ""}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                className="min-h-24 resize-none"
              />
            </div>

            {/* Travel Destinations */}
            <div className="space-y-2">
              <Label>Travel Destinations</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.travelDestinations && formData.travelDestinations.length > 0 ? (
                  formData.travelDestinations.map((destination) => (
                    <Badge
                      key={destination}
                      variant="secondary"
                      className="px-3 py-1.5 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => handleRemoveDestination(destination)}
                    >
                      {destination}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No destinations added yet</p>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddDestination()}
                  placeholder="Add a destination..."
                />
                <Button onClick={handleAddDestination} variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} disabled={isSaving || !hasUnsavedChanges}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Discard Changes?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to discard them?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Editing
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}