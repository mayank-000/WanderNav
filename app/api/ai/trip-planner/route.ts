import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { type NextRequest, NextResponse } from "next/server";
import { marked } from "marked";

const ai = genkit({
  plugins: [googleAI()],
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body) {
    return NextResponse.json({});
  }

  const prompt = `
    Create a comprehensive ${body.number}-person ${body.type} trip itinerary for ${body.destination} from ${body.start_date} to ${body.end_date} with a ${body.budget} budget.

    TRAVELER PROFILE:
    → Group size: ${body.number} people
    → Trip type: ${body.type}
    → Interests: ${body.interest}
    → Accommodation preference: ${body.accommodation}
    → Physical activity level: ${body.activity}
    → Budget range: ${body.budget}

    RESPONSE STRUCTURE REQUIREMENTS:

    TRIP OVERVIEW & BUDGET ANALYSIS
    → Destination highlights and unique selling points
    → Best travel seasons, weather patterns, and what to expect during visit dates
    → Currency information, and cost-saving strategies
    → Travel insurance if applicable

    DAY-BY-DAY DETAILED ITINERARY
    Add day number also like Day1, Day2 and all
    For each day from ${body.start_date} to ${body.end_date}, provide:

    → Primary activity with exact location, opening hours, and entry fees
    → Transportation method and cost from accommodation
    → Main attraction or experience with detailed description
    → Lunch recommendations nearby with price ranges
    → Dinner location with ambiance description and specialty dishes
    → Nightlife options suitable for the group type

    UNDERRATED GEMS & HIDDEN TREASURES
    → Secret spots locals love but tourists rarely find
    → Traditional workshops and artisan experiences
    → Scenic viewpoints off the beaten path
    → Historical sites with untold stories
    → Photography locations for unique Instagram-worthy shots

    ACCOMMODATION DEEP DIVE
    → Booking strategies and distance to major attractions

    CULINARY EXPLORATION
    → Signature local dishes and where to find the best versions
    → Local markets for fresh ingredients and souvenirs

    TRANSPORTATION MASTERY
    → Airport to accommodation: all options with costs
    → Multi-day passes and tourist transport cards
    → Late-night transport options for safety

    CULTURAL IMMERSION & LOCAL INSIGHTS
    → Cultural etiquette: dos and don'ts for respectful travel
    → Dress codes for religious sites and upscale venues

    CONTINGENCY PLANNING
    → Alternative attractions if main ones are closed

    FORMAT REQUIREMENTS & LENGTH CONTROL:
    → Use indented bullet points exclusively
    → No bold headings
    → Focus on most essential information only - prioritize quality over quantity
    → Provide actionable, practical information without excessive detail
    → Total response should be comprehensive yet scannable 

    The response should cover all aspects while remaining concise and immediately actionable for travelers also the the response must be compact so that user does not have to read more.
    `;

  try {
    console.log("Starting AI generation with Genkit...");

    const response = await ai.generate({
      model: "googleai/gemini-2.5-flash",
      prompt: prompt,
    });

    // Type assertion to access the response properties
    const genkitResponse = response as any;

    let aitext = "";
    try {
      aitext = genkitResponse.custom.text();
    } catch (error) {
      aitext = genkitResponse.raw.text();
    }

    console.log("AI generation successful, response length:", aitext.length);

    const htmlContent = await marked.parse(aitext);

    const styledHtml = `
      <div style="
        font-family: Arial, sans-serif; 
        line-height: 1.6; 
        color: white; 
        background-color: #2c2c2c;
        margin: 0;
        padding: 30px;
        min-height: 100vh;
        width: 100%;
        box-sizing: border-box;
      ">
        
        <div style="
          text-align: center;
          margin-bottom: 40px;
          padding: 20px;
          background-color: #404040;
          border-radius: 8px;
        ">
          <h1 style="
            margin: 0;
            font-size: 2.5em;
            font-weight: bold;
            color: white;
            line-height: 1.3;
          ">Your Journey to ${body.destination}</h1>
        </div>
        
        <div style="
          font-size: 16px;
          line-height: 1.6;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 20px;
        ">
          ${htmlContent
            .replace(
              /<h1>/g,
              '<h1 style="color: white; font-size: 2em; font-weight: bold; margin: 30px 0 15px 0; text-align: left; padding: 15px; background-color: #404040; border-radius: 6px; border-left: 4px solid #666;">',
            )
            .replace(/<\/h1>/g, "</h1>")
            .replace(
              /<h2>/g,
              '<h2 style="color: white; font-size: 1.6em; font-weight: bold; margin: 25px 0 12px 0; text-align: left; padding: 12px; background-color: #383838; border-radius: 4px; border-left: 3px solid #555;">',
            )
            .replace(/<\/h2>/g, "</h2>")
            .replace(
              /<h3>/g,
              '<h3 style="color: white; font-size: 1.4em; font-weight: bold; margin: 20px 0 10px 0; padding: 10px; background-color: #333; border-radius: 4px;">',
            )
            .replace(/<\/h3>/g, "</h3>")
            .replace(
              /<h4>/g,
              '<h4 style="color: white; font-size: 1.2em; font-weight: bold; margin: 15px 0 8px 0; padding: 8px; background-color: #2f2f2f;">',
            )
            .replace(/<\/h4>/g, "</h4>")
            .replace(/<ul>/g, '<ul style="margin: 15px 0; padding-left: 25px;">')
            .replace(
              /<li>/g,
              '<li style="margin: 8px 0; padding: 6px 0; color: white; font-size: 16px; line-height: 1.6;">',
            )
            .replace(/<\/li>/g, "</li>")
            .replace(
              /<p>/g,
              '<p style="margin: 12px 0; color: white; line-height: 1.6; font-size: 16px; padding: 5px 0;">',
            )
            .replace(
              /<strong>/g,
              '<strong style="font-weight: bold; color: #f0f0f0;">',
            )
            .replace(
              /<em>/g,
              '<em style="font-style: italic; color: #e0e0e0;">',
            )
            .replace(
              /Day 1/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 1</span>',
            )
            .replace(
              /Day 2/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 2</span>',
            )
            .replace(
              /Day 3/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 3</span>',
            )
            .replace(
              /Day 4/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 4</span>',
            )
            .replace(
              /Day 5/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 5</span>',
            )
            .replace(
              /Day 6/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 6</span>',
            )
            .replace(
              /Day 7/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 7</span>',
            )
            .replace(
              /Day 8/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 8</span>',
            )
            .replace(
              /Day 9/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 9</span>',
            )
            .replace(
              /Day 10/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 10</span>',
            )
            .replace(
              /day 1/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 1</span>',
            )
            .replace(
              /day 2/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 2</span>',
            )
            .replace(
              /day 3/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 3</span>',
            )
            .replace(
              /day 4/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 4</span>',
            )
            .replace(
              /day 5/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 5</span>',
            )
            .replace(
              /day 6/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 6</span>',
            )
            .replace(
              /day 7/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 7</span>',
            )
            .replace(
              /day 8/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 8</span>',
            )
            .replace(
              /day 9/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 9</span>',
            )
            .replace(
              /day 10/g,
              '<span style="color: #fff; font-weight: bold; background-color: #404040; padding: 4px 8px; border-radius: 3px;">Day 10</span>',
            )}
        </div>
        
      </div>
    `;

    return NextResponse.json({
      success: true,
      tripplan: styledHtml,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate trip plan",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
