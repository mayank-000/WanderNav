import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const recentPhotos = [
  {
    id: 1,
    src: "/mountain-landscape.png",
    alt: "Mountain landscape",
    location: "Swiss Alps",
  },
  {
    id: 2,
    src: "/tropical-beach-sunset.png",
    alt: "Beach sunset",
    location: "Maldives",
  },
  {
    id: 3,
    src: "/ancient-temple.png",
    alt: "Ancient temple",
    location: "Kyoto, Japan",
  },
  {
    id: 4,
    src: "/northern-lights-aurora.png",
    alt: "Northern lights",
    location: "Iceland",
  },
  {
    id: 5,
    src: "/desert-sand-dunes.png",
    alt: "Desert dunes",
    location: "Sahara Desert",
  },
  {
    id: 6,
    src: "/nighttime-cityscape.png",
    alt: "City skyline",
    location: "Tokyo, Japan",
  },
]

export function RecentUploads() {
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
        <div className="grid grid-cols-3 gap-4">
          {recentPhotos.map((photo) => (
            <div key={photo.id} className="group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">{photo.location}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
