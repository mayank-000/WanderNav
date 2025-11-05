import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Video, MapPin, Plane } from "lucide-react"
import type { User } from "@/types/user"
import type { Trip } from "@/types/trip"

interface StatsProps {
  userData?: User | null
}

export function TravelStats({ userData: initialUserData }: StatsProps) {
  const [userData, setUserData] = useState<User | null>(initialUserData || null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTripsData()
  }, [])

  const fetchTripsData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/profile/get/trips')
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("No trips found")
          setTrips([])
          return
        }
        throw new Error('Failed to fetch trips')
      }

      const data = await response.json()
      
      // If API returns a single trip object
      if (data && !Array.isArray(data)) {
        setTrips([data])
      } else {
        // If API returns an array of trips
        setTrips(data || [])
      }
      
      // Set userData if provided
      if (initialUserData) {
        setUserData(initialUserData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setTrips([])
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      title: "Photos",
      value: userData?.numberOfPhotosUploaded ?? 0,
      icon: Camera,
      change: "+12%"
    },
    {
      title: "Videos",
      value: userData?.numberOfVideosUploaded ?? 0,
      icon: Video,
      change: "+8%"
    },
    {
      title: "Destinations",
      value: trips.length,
      icon: MapPin,
      change: "+3%"
    },
    {
      title: "Distance Traveled",
      value: userData?.distanceTraveled ? `${userData.distanceTraveled} km` : "0 km",
      icon: Plane,
      change: "+25%"
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Travel Information</h2>
          <p className="text-muted-foreground">Loading your journey...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-20"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16 mb-2"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Travel Information</h2>
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Travel Information</h2>
        <p className="text-muted-foreground">Your journey at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}