import { model, Schema } from "mongoose";
import { ITeacher } from "./teachers.interface";

const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    teacherId: { type: String, default: "" },
    email: { type: String, required: true },
    number: { type: String, required: true },
    designation: { type: String, required: true, default: "সহকারী শিক্ষক" },
    department: { type: String, default: "সাধারণ" },
    education: { type: String, required: true },
    experience: { type: String, default: "৩+ বছর" },
    subject: {
      type: [String],
      required: true,
      default: [],
    },
    classes: {
      type: [String],
      default: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
    },
    gender: { type: String, enum: ["male", "female"], required: true, default: "male" },
    profileImage: { type: String, default: "" },
    profileImagePublicId: { type: String, default: "" },
    joiningDate: { type: String, default: "" },
    bio: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Teacher = model<ITeacher>("Teacher", teacherSchema);