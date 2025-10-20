import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    [key: string]: any;
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }  
        
        const body = await req.formData();
        const file = body.get('file') as File;
        const type = body.get('type') as string; // e.g., 'profile' or 'cover'

        if (!file || !type) {
            return NextResponse.json({ error: "No image data provided" }, { status: 400 });
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { 
                    folder: `WanderNav ${type}_images`,
                    transformation: [
                        { width: type === 'profile' ? 500 : 1200, crop: "limit" },
                        { quality: "auto" }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as CloudinaryUploadResult);
                }
            )
            uploadStream.end(buffer);
        })
        
        return NextResponse.json({ message: "Image uploaded successfully", url: result.secure_url });

    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}