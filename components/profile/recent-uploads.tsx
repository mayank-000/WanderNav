import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { User } from "@/types/user"

interface RecentUploadsProps {
  userData: User | null
}

export function RecentUploads({ userData }: RecentUploadsProps) {
  const recentPhotos = () => {
    if(!userData?.photos) return [];
    return userData.photos.slice(0, 6);
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold">Recent Uploads</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Your latest travel memories</p>
        </div>
        <Button variant="outline" size="sm">
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        {recentPhotos().length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {recentPhotos().map((photo) => (
              <div key={photo.id} className="group cursor-pointer">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt || "Travel photo"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {photo.location || "Unknown location"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No photos uploaded yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
