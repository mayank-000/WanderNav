import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    try {

        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { userDetails } = body;

        if(!userDetails || Object.keys(userDetails).length === 0) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }

        await connectDB();

        const allowedFields = [
            'username', 'firstName', 'lastName', 'bio',
            'profilePhoto', 'coverPhoto', 'travelDestinations',
        ];

        // Filter out non-allowed fields
        const filteredUpdates: any = {};
        Object.keys(userDetails).forEach(key => {
            if (allowedFields.includes(key)) {
                filteredUpdates[key] = userDetails[key];
            }
        });

        // Update user and return new document
        const updatedUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { $set: filteredUpdates },
            { 
                new: true,           // Return updated document
                runValidators: true  // Run schema validation
            }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}