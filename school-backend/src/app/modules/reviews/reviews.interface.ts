import { Types } from "mongoose";

export interface IReview {
  user?: Types.ObjectId;
  title?: string;
  comment: string;
  name: string;
  designation?: string; // e.g. "অভিভাবক" / "শিক্ষার্থী" / "প্রাক্তন শিক্ষার্থী"
  rating?: number;
  status: "approved" | "pending";
}
