// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  profilePhoto?: string | null;
  coverPhoto?: string | null;
  firstName?: string;
  lastName?: string;
  bio?: string;
  numberOfVideosUploaded: number;
  numberOfPhotosUploaded: number;
  photos: {
    id: string;
    src: string | null;
    alt?: string;
    location?: string;
  }[];
  travelDestinations: string[];
  distanceTraveled?: number;
  isActive: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    coverPhoto: {
      type: String,
      default: null,
    },
    firstName: String,
    lastName: String,
    bio: {
      type: String,
      maxlength: 500,
    },
    numberOfVideosUploaded: {
      type: Number,
      default: 0,
      min: 0,
    },
    numberOfPhotosUploaded: {
      type: Number,
      default: 0,
      min: 0,
    },
    photos: [{
      id: String,
      src: String,
      alt: String,
      location: String,
    }],
    travelDestinations: [String],
    distanceTraveled: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes ONLY here, not in the field definition
userSchema.index({ createdAt: -1 });

const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;