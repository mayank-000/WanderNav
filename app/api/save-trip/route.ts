import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Trip from "@/models/Trip";
import connectDB from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { title, tripPlans } = await req.json();
        if (!title || !tripPlans) {
            return new NextResponse("Missing title or tripPlans", { status: 400 });
        }
        await connectDB();
        const newTrip = await Trip.create({
            user: userId,
            title: title,
            tripPlans : tripPlans,
        });
        await newTrip.save();
        return NextResponse.json({ message: "Trip saved successfully", trip: newTrip
        })

    } catch (error) {
        console.error("Error saving trip:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}