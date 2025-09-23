import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { NextRequest, NextResponse } from "next/server";

const ai = genkit({
  plugins: [googleAI()],
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json({});
  }

  const prompt = `
Create a comprehensive ${body.number}-person ${body.type} trip itinerary for ${body.destination} from ${body.start_date} to ${body.end_date} with a $${body.budget} budget.

TRAVELER PROFILE:
→ Group size: ${body.number} people
→ Trip type: ${body.type}
→ Interests: ${body.interest}
→ Accommodation preference: ${body.accommodation}
→ Physical activity level: ${body.activity}
→ Budget range: $${body.budget}

RESPONSE STRUCTURE REQUIREMENTS:

TRIP OVERVIEW & BUDGET ANALYSIS
→ Destination highlights and unique selling points
→ Best travel seasons, weather patterns, and what to expect during visit dates
→ Currency information, tipping culture, and cost-saving strategies
→ Travel insurance and visa requirements if applicable

DAY-BY-DAY DETAILED ITINERARY
Add day number also like day1, day2 and all
For each day from ${body.start_date} to ${body.end_date}, provide:

→ Primary activity with exact location, opening hours, and entry fees
→ Transportation method and cost from accommodation
→ Estimated time needed and crowd levels
→ Photography tips and best viewing spots
→ Main attraction or experience with detailed description
→ Lunch recommendations nearby with price ranges
→ Alternative activities if weather doesn't cooperate
→ Shopping opportunities and local markets
→ Dinner location with ambiance description and specialty dishes
→ Nightlife options suitable for the group type
→ Cultural performances or local entertainment
→ Safe return routes to accommodation

UNDERRATED GEMS & HIDDEN TREASURES
For each location, include:
→ Secret spots locals love but tourists rarely find
→ Emerging neighborhoods with authentic character
→ Traditional workshops and artisan experiences
→ Scenic viewpoints off the beaten path
→ Historical sites with untold stories
→ Local festivals or events happening during the visit
→ Underground food scenes and hole-in-the-wall eateries
→ Nature spots perfect for ${body.activity} activity level
→ Photography locations for unique Instagram-worthy shots
→ Community projects or volunteer opportunities

ACCOMMODATION DEEP DIVE
→ Specific property recommendations matching ${body.accommodation} style
→ Neighborhood analysis: safety, accessibility, local character
→ Room types, amenities, and special packages available
→ Booking strategies: direct vs platform, cancellation policies
→ Alternative backup options in different price ranges
→ Distance to major attractions and transport hubs

CULINARY EXPLORATION
→ Signature local dishes and where to find the best versions
→ Street food safety tips and must-try vendors
→ Fine dining experiences within budget constraints
→ Cooking classes or food tours available
→ Dietary restrictions and how to navigate them
→ Local markets for fresh ingredients and souvenirs
→ Breakfast, lunch, and dinner budget allocations
→ Seasonal specialties available during visit dates

TRANSPORTATION MASTERY
→ Airport/station to accommodation: all options with costs
→ Daily transportation: walking routes, public transit, ride-sharing
→ Multi-day passes and tourist transport cards
→ Bike rentals and walking tour opportunities
→ Day trip transportation to nearby cities or attractions
→ Late-night transport options for safety
→ Accessibility options for mobility challenges

CULTURAL IMMERSION & LOCAL INSIGHTS
→ Essential phrases in local language with pronunciations
→ Cultural etiquette: dos and don'ts for respectful travel
→ Tipping guidelines for different services
→ Dress codes for religious sites and upscale venues
→ Local customs and traditions to be aware of
→ Shopping etiquette and bargaining strategies
→ Social norms and conversation starters with locals
→ Religious or cultural sites requiring special respect

PRACTICAL SURVIVAL GUIDE
→ Weather-appropriate packing checklist
→ Essential apps for navigation, translation, and bookings
→ Emergency contacts: police, medical, tourist assistance
→ Common scams and how to avoid them
→ ATM locations and card acceptance rates
→ Pharmacy locations and common medication names
→ Internet connectivity and SIM card options
→ Laundry facilities and services

HIDDEN POTENTIAL LOCATIONS
→ Up-and-coming districts experiencing renaissance
→ Recently opened attractions or experiences
→ Seasonal phenomena unique to the destination
→ Local startup businesses offering unique services
→ Community-led initiatives and social enterprises
→ Underdeveloped natural areas with future tourism potential
→ Local artists' studios and creative spaces
→ Traditional crafts workshops open to visitors
→ Sustainable tourism initiatives to support

CONTINGENCY PLANNING
→ Indoor activities for bad weather days
→ Backup restaurants if primary choices are full
→ Alternative attractions if main ones are closed
→ Flexible itinerary adjustments for different energy levels
→ Group activity alternatives if preferences differ
→ Extended stay options if flights are delayed
→ Quick escape routes from crowded tourist areas

FORMAT REQUIREMENTS:
→ Use arrows (→) and indented bullet points exclusively
→ No hashtags, asterisks, bold text, or italic formatting
→ Include specific addresses, phone numbers when available
→ Mention exact costs in local currency and USD equivalent
→ Provide precise timing recommendations
→ Keep descriptions informative but concise
→ Focus on actionable, practical information
→ Avoid generic phrases like "based on your preferences"
→ Include insider tips from local perspective
→ Organize information in logical, easy-to-follow sequence

The response should be comprehensive yet compact, covering all aspects while remaining practical and immediately actionable for travelers.
`;

  try {
    const response = await ai.generate({
      model: "googleai/gemini-1.5-flash",
      prompt: prompt,
    });

    // Type assertion to access the response properties
    const genkitResponse = response as any;

    // Correct way to access the text content in GenkitF
    let tripPlanText;

    try {
      // The text is a function that needs to be called
      tripPlanText = genkitResponse.custom.text();
    } catch (error) {
      try {
        // Fallback to raw.text() if custom.text() fails
        tripPlanText = genkitResponse.raw.text();
      } catch (fallbackError) {
        console.error("Error extracting text:", error, fallbackError);
        tripPlanText = "Error extracting trip plan text";
      }
    }

    return NextResponse.json({
      success: true,
      tripPlan: tripPlanText,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate trip plan",
      },
      { status: 500 }
    );
  }
}
