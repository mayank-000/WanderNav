'use client'
import { MapPin, Sparkles, Plane } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HowItWorks() {

  const router = useRouter();

  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: "Tell Us Your Preferences",
      description:
        "Input your destination, travel dates, budget, and interests. Our smart form captures everything we need to create your perfect trip.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Generates Your Plan",
      description:
        "Our advanced AI analyzes your preferences and creates a personalized itinerary with optimized routes, activities, and budget breakdown.",
    },
    {
      number: "03",
      icon: Plane,
      title: "Book & Enjoy Your Trip",
      description:
        "Review your custom plan, make any adjustments, book your accommodations and activities, then embark on your perfectly planned adventure.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-black from-primary via-secondary to-accent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">How It Works</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-pretty">
            Get your perfect trip planned in three simple steps with WanderNav's AI-powered travel assistant
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 text-balance">{step.title}</h3>
                  <p className="text-white/90 leading-relaxed text-pretty">{step.description}</p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button onClick={() => router.push("/trip-planner")}
            className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Planning Your Trip
          </button>
        </div>
      </div>
    </section>
  )
}
