import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      {
        // other sections if needed----
      }
    </main>
  );
}

export const metadata = {
  title: "WanderNav - AI-Powered Trip Planning",
  description:
    "Plan your dream trip in minutes with AI. Get personalized itineraries, smart budget planning, and local recommendations.",
};
