import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, LogOut } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="h-48 bg-gradient-primary" />

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar and Info */}
        <div className="flex flex-col items-center -mt-16 space-y-4">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src="/travel-enthusiast-profile-photo.jpg" alt="Profile" />
            <AvatarFallback className="text-2xl bg-white text-primary">AW</AvatarFallback>
          </Avatar>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Alex Wanderer</h1>
            <p className="text-muted-foreground">alex.wanderer@email.com</p>
            <div className="flex items-center justify-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Digital Nomad • 47 Countries Explored</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
