import { model, Schema } from "mongoose";
import { IGallery } from "./gallery.interface";

const gallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    caption: { type: String, default: "" },
    category: { type: String, default: "Campus" },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Gallery = model<IGallery>("Gallery", gallerySchema);
