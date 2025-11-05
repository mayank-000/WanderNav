import mongoose, {Document, Model, Schema } from "mongoose";

export interface ITrip extends Document {
    user: string;
    title: String;
    tripPlans: string[];
}

const tripSchema = new Schema<ITrip>(
    {
        user: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        tripPlans: [String],
    },
    {
        timestamps: true
    }
);

const Trip: Model<ITrip> = mongoose.models.Trip || mongoose.model<ITrip>("Trip", tripSchema);
export default Trip;
