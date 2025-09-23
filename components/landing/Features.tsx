import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Calculator, Heart, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Itinerary Generation",
    description:
      "Let our advanced AI create personalized travel itineraries tailored to your preferences, budget, and travel style in seconds.",
  },
  {
    icon: Calculator,
    title: "Smart Budget Planning",
    description:
      "Intelligent budget tracking and optimization that helps you make the most of your travel funds with real-time cost analysis.",
  },
  {
    icon: Heart,
    title: "Personalized Recommendations",
    description:
      "Discover hidden gems and local favorites based on your interests, past trips, and traveler reviews from our community.",
  },
  {
    icon: RefreshCw,
    title: "Real-time Updates",
    description:
      "Stay informed with live updates on flight changes, weather conditions, local events, and travel advisories for your destination.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-black from-primary via-secondary to-accent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Intelligent Travel Planning</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            Experience the future of travel planning with AI-powered features designed to make your journey seamless and
            unforgettable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-0">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-white/20 bg-white/10"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 text-balance">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-pretty">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>     
      </div>
    </section>
  )
}
