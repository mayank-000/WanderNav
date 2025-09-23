"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar, MapPin, DollarSign, Sparkles, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const popularDestinations = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "London, UK",
  "Rome, Italy",
  "Barcelona, Spain",
  "Dubai, UAE",
  "Bali, Indonesia",
];

const tripTypes = ["Solo", "Couple", "Family", "Friends", "Business"];
const interests = [
  "Adventure",
  "Culture",
  "Food",
  "Nightlife",
  "Nature",
  "History",
  "Shopping",
  "Relaxation",
];
const accommodationTypes = ["Budget", "Mid-range", "Luxury"];
const activityLevels = ["Low", "Medium", "High"];

export default function TripPlannerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 2,
    tripType: "",
    budget: [2500],
    interests: [] as string[],
    accommodation: "",
    activityLevel: "",
  });
  const [tripPlan, setTripPlan] = useState("");

  const handleGenerateTrip = async () => {
    setIsGenerating(true);

    try {
      const response = await axios.post("/api/ai/trip-planner", {
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        number: formData.travelers,
        type: formData.tripType,
        budget: formData.budget[0],
        interest: formData.interests.join(", "), // Convert array to string
        accommodation: formData.accommodation,
        activity: formData.activityLevel,
      });

      if (response.data.success) {
        console.log("Trip Plan:", response.data.tripPlan);

        // Store the trip plan in state - THIS WAS MISSING!
        setTripPlan(response.data.tripPlan); // Add this line
        setHasResults(true);
      } else {
        console.error("Failed to generate trip");
        setHasResults(false); // Set to false on failure
      }
    } catch (error) {
      console.log("Failed to fetch response", error);
      setHasResults(false); // Set to false on error
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              WanderNav
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Destinations
            </a>
            <a href="#" className="text-primary font-medium">
              AI Trip Planner
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Trip Planner
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our AI create the perfect itinerary tailored to your
            preferences, budget, and travel style.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Progress Indicator */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">
                    Step {currentStep} of 3
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((currentStep / 3) * 100)}% Complete
                  </span>
                </div>
                <Progress value={(currentStep / 3) * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Step 1 - Destination */}
            {currentStep >= 1 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Where do you want to go?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="Search for a destination..."
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          destination: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Popular Destinations
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularDestinations.map((dest) => (
                        <Badge
                          key={dest}
                          variant={
                            formData.destination === dest
                              ? "default"
                              : "secondary"
                          }
                          className="cursor-pointer hover:bg-primary/20 transition-colors"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              destination: dest,
                            }))
                          }
                        >
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {currentStep === 1 && (
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="w-full"
                      disabled={!formData.destination}
                    >
                      Next: Travel Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2 - Travel Details */}
            {currentStep >= 2 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Travel Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Departure Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Return Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Number of Travelers: {formData.travelers}</Label>
                    <Slider
                      value={[formData.travelers]}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          travelers: value[0],
                        }))
                      }
                      max={10}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Trip Type</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tripTypes.map((type) => (
                        <Badge
                          key={type}
                          variant={
                            formData.tripType === type ? "default" : "secondary"
                          }
                          className="cursor-pointer hover:bg-primary/20 transition-colors"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, tripType: type }))
                          }
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {currentStep === 2 && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        className="flex-1"
                        disabled={
                          !formData.startDate ||
                          !formData.endDate ||
                          !formData.tripType
                        }
                      >
                        Next: Preferences
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3 - Budget & Preferences */}
            {currentStep >= 3 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Budget & Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>
                      Budget Range: ${formData.budget[0].toLocaleString()}
                    </Label>
                    <Slider
                      value={formData.budget}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, budget: value }))
                      }
                      max={10000}
                      min={500}
                      step={100}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant={
                            formData.interests.includes(interest)
                              ? "default"
                              : "secondary"
                          }
                          className="cursor-pointer hover:bg-primary/20 transition-colors"
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Accommodation Type</Label>
                    <div className="flex gap-2 mt-2">
                      {accommodationTypes.map((type) => (
                        <Badge
                          key={type}
                          variant={
                            formData.accommodation === type
                              ? "default"
                              : "secondary"
                          }
                          className="cursor-pointer hover:bg-primary/20 transition-colors"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              accommodation: type,
                            }))
                          }
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Activity Level</Label>
                    <div className="flex gap-2 mt-2">
                      {activityLevels.map((level) => (
                        <Badge
                          key={level}
                          variant={
                            formData.activityLevel === level
                              ? "default"
                              : "secondary"
                          }
                          className="cursor-pointer hover:bg-primary/20 transition-colors"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              activityLevel: level,
                            }))
                          }
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {currentStep === 3 && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleGenerateTrip}
                        className="flex-1"
                        disabled={
                          isGenerating ||
                          !formData.accommodation ||
                          !formData.activityLevel
                        }
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate My Trip Plan
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* AI Generation Status */}
            {isGenerating && (
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        AI is planning your trip...
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Analyzing destinations, finding the best deals, and
                        creating your perfect itinerary.
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Estimated time: 2-3 minutes
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Results */}
          {/* Right Column - Results */}
          <div className="space-y-6">
            {hasResults ? (
              <>
                <Card className="glass-card">
                  <CardContent className="p-12">
                    {tripPlan ? (
                      <div>
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-6 text-center">
                          Your Personalized Trip Plan
                        </h3>
                        <div className="text-left space-y-4">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                            {tripPlan}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center opacity-20">
                          <Sparkles className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          Trip Plan Generated
                        </h3>
                        <p className="text-muted-foreground">
                          Your AI-generated trip plan will appear here.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="glass-card">
                <CardContent className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center opacity-20">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Your AI-Generated Trip Plan
                  </h3>
                  <p className="text-muted-foreground">
                    Complete the form on the left to generate your personalized
                    travel itinerary.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
