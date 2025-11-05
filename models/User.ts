// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

// What it is: A TypeScript Interface.

// Its Job: This is a compile-time "blueprint" for your TypeScript code.

// Why it's needed: It tells the TypeScript compiler what a User object looks like. This gives you:

// Type Safety: You'll get an error in your code editor (like VS Code) if you try to access a property that doesn't exist (e.g., user.emial instead of user.email).

// Autocomplete: Your editor can suggest properties like user.clerkId, user.username, etc., because it knows the IUser shape.

// What extends Document does: This part merges your custom properties (clerkId, email, etc.) with the properties and methods that Mongoose adds to every document (like _id, .save(), .remove(), createdAt, updatedAt).

// Analogy: This is the architect's blueprint for your application. It helps you build the rest of your app correctly before you run it. 
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

// What it is: A Mongoose Schema.

// Its Job: This is a runtime "rulebook" for your MongoDB database.

// Why it's needed: This object tells Mongoose how to handle the data when it's saved to or read from the database. It defines:

// Data Validation: (required: true, minlength: 3, unique: true). Mongoose will throw an error if you try to save a user without an email.

// Database Types: (type: String, type: Number). This ensures the data in MongoDB is stored correctly.

// Defaults: (default: 0). If you create a user without specifying numberOfVideosUploaded, Mongoose will set it to 0 automatically.

// Analogy: This is the database bouncer or rulebook. It actively checks every piece of data at runtime to ensure it follows the rules before letting it into the database.

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
// Indexes: (userSchema.index(...)). This tells MongoDB to optimize queries for this field.
userSchema.index({ createdAt: -1 });

const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;