import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from '@/models/User';

export async function POST(req: Request) {
    console.log("Webhook Endpoint Hit!");
    const webhook_secret = process.env.CLERK_WEBHOOK_SECRET;

    if(!webhook_secret) {
        console.error("CLERK_WEBHOOK_SECRET is not set");
        return new Response("Webhook secret not configured", { status: 500 });
    }
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if(!svix_id || !svix_signature || !svix_timestamp) {
        console.error("Missing svix headers");
        return new Response("Error occured - No svix headers");
    }

    const payload = await req.text();
        
    const wh = new Webhook(webhook_secret);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(payload, {
            "svix-id" : svix_id,
            "svix-timestamp" : svix_timestamp,
            "svix-signature" : svix_signature
        }) as WebhookEvent;

        console.log("Webhook verified successfully:", evt.type);

    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured - Invalid signature", { status: 400 });
    }

    const eventType = evt.type;

    try {
        
        await connectDB();
        console.log("✅ Connected to database");

        if(eventType === "user.created") {
            console.log("Webhook verified successfully:", eventType);

            const { id, email_addresses } = evt.data;

            const primaryEmail = email_addresses?.find(
                (email) => email.id === evt.data.primary_email_address_id
            );

            if(!primaryEmail) {
                console.error("No primary email found for user", id);
                return new Response("No primary email found for user", { status: 400 });
            }

            const existingUser = await User.findOne({ clerkId: id });
            if(existingUser) {
                console.log("User already exists:", id);
                return new Response("User already exists", { status: 200 });
            }

            // Generate a simple username from email (before @)
            const emailUsername = primaryEmail.email_address.split('@')[0];
            const baseUsername = emailUsername.replace(/[^a-zA-Z0-9]/g, ''); // Remove special chars
            
            // Make it unique with random suffix
            const randomSuffix = Math.random().toString(36).substring(2, 6);
            const generatedUsername = `${baseUsername}_${randomSuffix}`;

            // Create new user
            const newUser = await User.create({
                clerkId: id,
                email: primaryEmail.email_address,
                username: generatedUsername,
                profilePhoto: null,
                coverPhoto: null,
                firstName: "",
                lastName: "",
                bio: "",
                numberOfVideosUploaded: 0,
                numberOfPhotosUploaded: 0,
                photos: [],
                travelDestinations: [],
                distanceTraveled: 0,
                isActive: true,
                lastLoginAt: new Date()
            });

            console.log("New user created is Database:", newUser._id);
            return new Response("User created successfully", { status: 201 });
        }


    } catch (error) {
        console.error("Database operation error:", error);
        
        // Handle duplicate key error (E11000)
        if (error instanceof Error && error.message.includes("E11000")) {
            console.log("Duplicate key error - user likely already exists");
            return new Response("User already exists", { status: 200 });
        }

        return new Response("Error: Failed to process webhook", { status: 500 });
        
    }
    return new Response("Webhook received successfully", {status: 200});
}