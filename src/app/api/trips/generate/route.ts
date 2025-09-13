import { NextResponse } from 'next/server';
import { ai } from '@/ai/genkit'; // Import your AI instance

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destinationName, userInterests, budget } = body;

    // Fetch destination details from MongoDB Atlas
    const API_ENDPOINT = `https://data.mongodb-api.com/app/${process.env.MONGODB_APP_ID}/endpoint/data/v1/action/findOne`;
    const destRes = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.MONGODB_API_KEY || '',
      },
      body: JSON.stringify({
        dataSource: process.env.MONGODB_DATA_SOURCE,
        database: process.env.MONGODB_DATABASE,
        collection: 'destinations',
        filter: { name: destinationName }
      })
    });

    if (!destRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
    }

    const destination = await destRes.json();

    // Craft AI prompt
    const prompt = `
      Create a 7-day travel itinerary for ${destination.document.name} in ${destination.document.country}.
      Use these tips:
      Best season: ${destination.document.bestSeason}
      Transport: ${destination.document.transportInfo}
      Budget tips: ${destination.document.budgetTips}

      User's interests: ${userInterests}
      Budget: $${budget}

      Make it friendly, informative, and personalized.
    `;

    // Call Genkit AI
    const response = await ai.chat([
      { role: 'user', content: prompt }
    ]);

    const message = response.choices[0]?.message.content || 'No itinerary generated.';

    return NextResponse.json({ itinerary: message });

  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
