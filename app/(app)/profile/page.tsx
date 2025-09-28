'use client'
import { ProfileHeader } from "@/components/profile/profile-header"
import { TravelStats } from "@/components/profile/travel-stats"
import { RecentUploads } from "@/components/profile/recent-uploads"
import { TravelMap } from "@/components/profile/travel-map"
import { Sidebar } from "@/components/profile/sidebar"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Profile Header */}
          <ProfileHeader />

          {/* Main Content Area */}
          <div className="p-6 space-y-8">
            {/* Travel Stats Dashboard */}
            <TravelStats />

            {/* Recent Uploads and Travel Map */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentUploads />
              <TravelMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
