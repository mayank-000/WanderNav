import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Edit2 } from "lucide-react"
import type { User } from "@/types/user"

interface ProfileHeaderProps {
  userData: User | null
  onEditClick: () => void
}

export function ProfileHeader({ userData, onEditClick }: ProfileHeaderProps) {
  // Get user initials for fallback
  const getInitials = () => {
    if (!userData?.firstName && !userData?.lastName) return "U"
    const first = userData?.firstName?.[0] || ""
    const last = userData?.lastName?.[0] || ""
    return `${first}${last}`.toUpperCase()
  }

  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="h-48 bg-gradient-primary" />

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar and Info */}
        <div className="flex flex-col items-center -mt-16 space-y-4">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={userData?.profilePhoto || undefined} alt="Profile" />
            <AvatarFallback className="text-2xl bg-white text-primary">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {userData?.firstName && userData?.lastName 
                ? `${userData.firstName} ${userData.lastName}` 
                : userData?.username || "User"}
            </h1>
            <p className="text-muted-foreground">{userData?.email || "—"}</p>
            <div className="flex items-center justify-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {userData?.travelDestinations?.length 
                  ? `${userData.travelDestinations.length} Destinations Explored` 
                  : "No destinations yet"}
              </span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button onClick={onEditClick} className="gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )
}