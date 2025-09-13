import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const API_ENDPOINT = `https://data.mongodb-api.com/app/${process.env.MONGODB_APP_ID}/endpoint/data/v1/action/find`;

  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.MONGODB_API_KEY || '',
    },
    body: JSON.stringify({
      dataSource: process.env.MONGODB_DATA_SOURCE || 'Cluster0',
      database: process.env.MONGODB_DATABASE || 'wanderNavDB',
      collection: 'destinations',
      filter: {}
    })
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json(data.documents);
}
