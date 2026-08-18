import { Types } from "mongoose";

export interface IReview {
  user?: Types.ObjectId;
  title?: string;
  comment: string;
  name: string;
  designation?: string; // e.g. "Guardian" / "Student" / "Alumni"
  rating?: number;
  status: "approved" | "pending";
}
