import { genkit } from "genkit"
import { googleAI } from "@genkit-ai/googleai"
import { type NextRequest, NextResponse } from "next/server"
import { marked } from "marked"

const ai = genkit({
  plugins: [googleAI()],
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body) {
    return NextResponse.json({})
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
→ Traditional workshops and artisan experiences
→ Scenic viewpoints off the beaten path
→ Historical sites with untold stories
→ Local festivals or events happening during the visit
→ Nature spots perfect for ${body.activity} activity level
→ Photography locations for unique Instagram-worthy shots

ACCOMMODATION DEEP DIVE
→ Specific property recommendations matching ${body.accommodation} style
→ Neighborhood analysis: safety, accessibility, local character
→ Booking strategies: direct vs platform, cancellation policies
→ Distance to major attractions and transport hubs

CULINARY EXPLORATION
→ Signature local dishes and where to find the best versions
→ Fine dining experiences within budget constraints
→ Local markets for fresh ingredients and souvenirs
→ Breakfast, lunch, and dinner budget allocations
→ Seasonal specialties available during visit dates

TRANSPORTATION MASTERY
→ Airport/station to accommodation: all options with costs
→ Multi-day passes and tourist transport cards
→ Bike rentals and walking tour opportunities
→ Late-night transport options for safety

CULTURAL IMMERSION & LOCAL INSIGHTS
→ Essential phrases in local language with pronunciations
→ Cultural etiquette: dos and don'ts for respectful travel
→ Dress codes for religious sites and upscale venues
→ Local customs and traditions to be aware of
→ Shopping etiquette and bargaining strategies
→ Social norms and conversation starters with locals
→ Religious or cultural sites requiring special respect

PRACTICAL SURVIVAL GUIDE
→ Weather-appropriate packing checklist
→ Essential apps for navigation, translation, and bookings
→ Common scams and how to avoid them
→ Internet connectivity and SIM card options
→ Laundry facilities and services

HIDDEN POTENTIAL LOCATIONS
→ Up-and-coming districts experiencing renaissance
→ Recently opened attractions or experiences
→ Seasonal phenomena unique to the destination
→ Underdeveloped natural areas with future tourism potential
→ Local artists' studios and creative spaces
→ Traditional crafts workshops open to visitors
→ Sustainable tourism initiatives to support

CONTINGENCY PLANNING
→ Indoor activities for bad weather days
→ Alternative attractions if main ones are closed
→ Flexible itinerary adjustments for different energy levels
→ Group activity alternatives if preferences differ
→ Extended stay options if flights are delayed
→ Quick escape routes from crowded tourist areas

FORMAT REQUIREMENTS:
→ Use indented bullet points exclusively
→ No make heading bold 
→ Include specific addresses, phone numbers when available
→ Mention exact costs in local currency and USD equivalent
→ Provide precise timing recommendations
→ Keep descriptions informative but concise
→ Focus on actionable, practical information
→ Avoid generic phrases like "based on your preferences"
→ Include insider tips from local perspective
→ Organize information in logical, easy-to-follow sequence

The response should be comprehensive yet compact, covering all aspects while remaining practical and immediately actionable for travelers.
`

  try {
    console.log("Starting AI generation with Genkit...")

    const response = await ai.generate({
      model: "googleai/gemini-1.5-flash",
      prompt: prompt,
    })

    // Type assertion to access the response properties
    const genkitResponse = response as any

    let aitext = ""
    try {
      aitext = genkitResponse.custom.text()
    } catch (error) {
      aitext = genkitResponse.raw.text()
    }

    console.log("AI generation successful, response length:", aitext.length)

    const htmlContent = await marked.parse(aitext)

    const styledHtml = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        line-height: 1.7; 
        color: #2c3e50; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        margin: 0;
        padding: 0;
        min-height: 100vh;
      ">
        <div style="
          background: white;
          margin: 20px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        ">
          <!-- Header Section -->
          <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
          ">
            <div style="font-size: 60px; margin-bottom: 10px;">✈️🌍</div>
            <h1 style="
              margin: 0;
              font-size: 2.5em;
              font-weight: 700;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
              letter-spacing: -0.5px;
            ">Your Dream Trip to ${body.destination}</h1>
            <p style="
              margin: 15px 0 0 0;
              font-size: 1.2em;
              opacity: 0.9;
              font-weight: 300;
            ">${body.number} ${body.number > 1 ? "travelers" : "traveler"} • ${
              body.type
            } adventure • $${body.budget} budget</p>
          </div>
          
          <!-- Content Section -->
          <div style="padding: 40px 30px;">
                      
            <div style="
              font-size: 16px;
              line-height: 1.8;
            ">
              ${htmlContent
                .replace(
                  /<h1>/g,
                  '<h1 style="color: #667eea; font-size: 2.2em; font-weight: 800; margin: 40px 0 20px 0; padding: 15px 0; border-bottom: 3px solid #667eea; display: flex; align-items: center;"><span style="margin-right: 15px; font-size: 1.2em;">🏆</span>',
                )
                .replace(/<\/h1>/g, "</h1>")
                .replace(
                  /<h2>/g,
                  '<h2 style="color: #764ba2; font-size: 1.8em; font-weight: 700; margin: 35px 0 15px 0; padding: 12px 20px; background: linear-gradient(135deg, #667eea15, #764ba215); border-left: 5px solid #764ba2; border-radius: 8px; display: flex; align-items: center;"><span style="margin-right: 12px; font-size: 1.1em;">📍</span>',
                )
                .replace(/<\/h2>/g, "</h2>")
                .replace(
                  /<h3>/g,
                  '<div style="background: linear-gradient(135deg, #e74c3c 0%, #f39c12 100%); color: white; padding: 20px; margin: 30px 0 20px 0; border-radius: 12px; box-shadow: 0 8px 16px rgba(231, 76, 60, 0.2);"><h3 style="color: white; font-size: 1.6em; font-weight: 800; margin: 0 0 15px 0; display: flex; align-items: center;"><span style="margin-right: 12px; font-size: 1.2em;">🌟</span>',
                )
                .replace(
                  /<\/h3>/g,
                  "</h3><div style='background: rgba(255,255,255,0.95); padding: 20px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #e74c3c;'>",
                )
                .replace(
                  /<h4>/g,
                  '<h4 style="color: #27ae60; font-size: 1.3em; font-weight: 700; margin: 20px 0 10px 0; display: flex; align-items: center; background: linear-gradient(135deg, #27ae6015, #2ecc7115); padding: 10px 15px; border-radius: 6px; border-left: 4px solid #27ae60;"><span style="margin-right: 10px;">💎</span>',
                )
                .replace(/<\/h4>/g, "</h4>")
                .replace(
                  /<h3 style="color: #e74c3c/g,
                  '</div></div><div style="background: linear-gradient(135deg, #e74c3c 0%, #f39c12 100%); color: white; padding: 20px; margin: 30px 0 20px 0; border-radius: 12px; box-shadow: 0 8px 16px rgba(231, 76, 60, 0.2);"><h3 style="color: white',
                )
                .replace(/<ul>/g, '<ul style="margin: 15px 0; padding-left: 0; list-style: none;">')
                .replace(
                  /<li>/g,
                  '<li style="margin: 8px 0; padding: 12px 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #17a2b8; border-radius: 6px; position: relative; padding-left: 50px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"><span style="position: absolute; left: 20px; top: 12px; color: #17a2b8; font-weight: 600;">→</span>',
                )
                .replace(/<p>/g, '<p style="margin: 15px 0; color: #34495e; line-height: 1.7;">')
                .replace(
                  /<strong>/g,
                  '<strong style="color: #2c3e50; font-weight: 700; background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 3px 8px; border-radius: 4px; border-left: 3px solid #f39c12;">',
                )
                .replace(
                  /<em>/g,
                  '<em style="color: #6c5ce7; font-style: normal; font-weight: 600; background: rgba(108, 92, 231, 0.1); padding: 2px 6px; border-radius: 3px;">',
                )}
            </div>
            <!-- Close the last day content box -->
            </div></div>
          </div>
          
          <!-- Footer -->
          <div style="
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 30px;
            text-align: center;
          ">
            <div style="font-size: 40px; margin-bottom: 15px;">🎉✨🌟</div>
            <p style="
              margin: 0;
              color: white;
              font-size: 1.1em;
              font-weight: 500;
            ">Have an amazing trip! Safe travels! 🧳✈️</p>
          </div>
        </div>
      </div>
    `

    return NextResponse.json({
      success: true,
      tripplan: styledHtml,
    })
  } catch (error) {
    console.error("AI Generation Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate trip plan",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
