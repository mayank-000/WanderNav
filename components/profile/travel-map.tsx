import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"
import type { User } from "@/types/user"

interface StatsProps {
  userData: User | null
}

export function TravelMap({ userData }: StatsProps) {
  const recentTrips = () => {
    if(!userData?.travelDestinations || userData.travelDestinations.length === 0) return [];
    return userData.travelDestinations.slice(0, 4).map((destination, index) => ({
      id: index,
      destination,
      date: "Unknown date",
      status: "completed",
      photos: Math.floor(Math.random() * 100),
    }));
  }

  const trips = recentTrips()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Travel Timeline</CardTitle>
        <p className="text-sm text-muted-foreground">Recent and upcoming adventures</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{trip.destination}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {trip.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {trip.photos > 0 && (
                    <span className="text-sm text-muted-foreground">{trip.photos} photos</span>
                  )}
                  <Badge
                    variant={trip.status === "completed" ? "default" : "secondary"}
                    className={trip.status === "completed" ? "bg-green-100 text-green-800" : ""}
                  >
                    {trip.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No destinations added yet</p>
            </div>
          )}
        </div>

        {/* Interactive Map Placeholder */}
        <div className="mt-6 h-48 bg-gradient-secondary rounded-lg flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-80" />
            <p className="text-sm opacity-90">Interactive Travel Map</p>
            <p className="text-xs opacity-70">Click to explore your journey</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}