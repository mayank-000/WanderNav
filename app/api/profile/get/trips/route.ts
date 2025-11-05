import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Trip from "@/models/Trip";
import connectDB from "@/lib/mongodb";

export async function GET() {

    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const trips = await Trip.findOne({ user: userId }).sort({ createdAt: -1 });

        if (!trips) {
            return NextResponse.json({ error: "No Trips to Show" }, { status: 404 });
        }

        return NextResponse.json(trips);

    } catch (error) {
        console.error("Failed to fetch trips:", error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}

