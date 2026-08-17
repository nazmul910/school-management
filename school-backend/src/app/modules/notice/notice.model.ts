import { model, Schema } from "mongoose";
import { INotice } from "./notice.interface";

const noticeSchema = new Schema<INotice>(
  {
    heading: { type: String, required: true },
    body: { type: String, required: true },
    pdfUrl: { type: String, default: "" },
    pdfPublicId: { type: String, default: "" },
    publishDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    isPinned: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Notice = model<INotice>("Notice", noticeSchema);
