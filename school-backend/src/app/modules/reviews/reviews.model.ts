import { Schema, model } from "mongoose";
import { IReview } from "./reviews.interface";

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "Feedback" },
    comment: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String, default: "Guardian" },
    rating: { type: Number, default: 5 },
    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model<IReview>("Review", reviewSchema);
