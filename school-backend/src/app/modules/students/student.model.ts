import mongoose, { Schema } from "mongoose";
import { IStudent } from "./student.interface";

const StudentSchema = new Schema<IStudent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    email: { type: String, default: "" },
    contact: { type: String, default: "" },
    roll: { type: Number, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true, default: "A" },
    group: { type: String, default: "" },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    fatherName: { type: String, default: "" },
    motherName: { type: String, default: "" },
    address: { type: String, default: "" },
    dob: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    admissionDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    isOnline: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
