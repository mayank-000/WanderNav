import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Using Clerk ID as primary identifier
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Basic user information
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    // Profile images
    profilePhoto: {
      type: String,
      default: null,
    },

    coverPhoto: {
      type: String,
      default: null,
    },

    // Content statistics
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

    // Travel destinations
    travelDestinations: [
      {
        name: String,
        country: String,
        visitedDate: Date,
        images: [String],
        description: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
    ],

    // Additional fields you might need
    firstName: String,
    lastName: String,
    bio: {
      type: String,
      maxlength: 500,
    },

    // Account status
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
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model("User", userSchema);

export default User;
