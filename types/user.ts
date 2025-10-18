export interface User {
  _id?: string
  clerkId: string
  email: string
  username: string
  profilePhoto: string | null
  coverPhoto: string | null
  firstName: string
  lastName: string
  bio: string
  numberOfVideosUploaded: number
  numberOfPhotosUploaded: number
  travelDestinations: string[]
  isActive: boolean
  lastLoginAt: string
  createdAt: string
  updatedAt: string
  __v?: number
}
export interface UserSettings {
  _id?: string
  userId: string
  isProfilePublic: boolean
  receiveEmailNotifications: boolean
  darkModeEnabled: boolean
  languagePreference: string
  timezone: string
  createdAt: string
  updatedAt: string
  __v?: number
}

