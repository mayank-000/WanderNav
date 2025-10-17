// lib/userService.ts
import connectDB from './mongodb';
import User from '@/models/User';
import { User as ClerkUser } from '@clerk/nextjs/server';

// Type definitions
interface TravelDestination {
  name: string;
  country: string;
  visitedDate: Date;
  images?: string[];
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface UserProfileUpdates {
  username?: string;
  bio?: string;
  profilePhoto?: string;
  coverPhoto?: string;
}

/**
 * Get or create user from Clerk data
 * Useful for manual sync if webhook fails
 */
export async function getOrCreateUser(clerkUser: ClerkUser) {
  await connectDB();
  
  const existingUser = await User.findOne({ clerkId: clerkUser.id });
  
  if (existingUser) {
    // Update last login
    existingUser.lastLoginAt = new Date();
    await existingUser.save();
    return existingUser;
  }
  
  // Get primary email
  const primaryEmail = clerkUser.emailAddresses.find(
    (email) => email.id === clerkUser.primaryEmailAddressId
  );

  if (!primaryEmail) {
    throw new Error('No primary email found for user');
  }
  
  // Create new user
  const newUser = await User.create({
    clerkId: clerkUser.id,
    email: primaryEmail.emailAddress,
    username: clerkUser.username || `user_${clerkUser.id.slice(0, 8)}`,
    profilePhoto: clerkUser.imageUrl || null,
    coverPhoto: null,
    firstName: clerkUser.firstName || '',
    lastName: clerkUser.lastName || '',
    numberOfVideosUploaded: 0,
    numberOfPhotosUploaded: 0,
    travelDestinations: [],
    lastLoginAt: new Date()
  });
  
  return newUser;
}

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string) {
  await connectDB();
  return await User.findOne({ clerkId });
}

/**
 * Update user stats (photos/videos)
 */
export async function updateUserStats(clerkId: string, type: 'video' | 'photo') {
  await connectDB();
  
  const updateField = type === 'video' 
    ? { $inc: { numberOfVideosUploaded: 1 } }
    : { $inc: { numberOfPhotosUploaded: 1 } };
  
  return await User.findOneAndUpdate(
    { clerkId },
    updateField,
    { new: true }
  );
}

/**
 * Add travel destination
 */
export async function addTravelDestination(
  clerkId: string, 
  destination: TravelDestination
) {
  await connectDB();
  
  return await User.findOneAndUpdate(
    { clerkId },
    { $push: { travelDestinations: destination } },
    { new: true }
  );
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  clerkId: string, 
  updates: UserProfileUpdates
) {
  await connectDB();
  
  // Only allow specific fields to be updated
  const allowedUpdates: Partial<UserProfileUpdates> = {
    username: updates.username,
    bio: updates.bio,
    profilePhoto: updates.profilePhoto,
    coverPhoto: updates.coverPhoto,
  };
  
  // Remove undefined values
  Object.keys(allowedUpdates).forEach((key) => {
    const typedKey = key as keyof UserProfileUpdates;
    if (allowedUpdates[typedKey] === undefined) {
      delete allowedUpdates[typedKey];
    }
  });
  
  return await User.findOneAndUpdate(
    { clerkId },
    allowedUpdates,
    { new: true, runValidators: true }
  );
}

/**
 * Get all users (for admin purposes)
 */
export async function getAllUsers(limit = 50, skip = 0) {
  await connectDB();
  
  return await User.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .select('-__v'); // Exclude version key
}

/**
 * Delete user by Clerk ID
 */
export async function deleteUserByClerkId(clerkId: string) {
  await connectDB();
  
  return await User.findOneAndDelete({ clerkId });
}

/**
 * Search users by username or email
 */
export async function searchUsers(query: string, limit = 20) {
  await connectDB();
  
  const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
  
  return await User.find({
    $or: [
      { username: searchRegex },
      { email: searchRegex },
      { firstName: searchRegex },
      { lastName: searchRegex }
    ]
  })
    .limit(limit)
    .select('clerkId username email profilePhoto firstName lastName');
}