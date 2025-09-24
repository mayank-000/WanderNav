import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Video, MapPin, Plane } from "lucide-react"

const stats = [
  {
    title: "Photos",
    value: "2,847",
    icon: Camera,
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    title: "Videos",
    value: "156",
    icon: Video,
    change: "+8%",
    changeType: "positive" as const,
  },
  {
    title: "Destinations",
    value: "47",
    icon: MapPin,
    change: "+3",
    changeType: "positive" as const,
  },
  {
    title: "Distance Traveled",
    value: "284,592 km",
    icon: Plane,
    change: "+15,420 km",
    changeType: "positive" as const,
  },
]

export function TravelStats() {
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
