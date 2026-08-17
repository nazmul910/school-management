import { Types } from "mongoose";

export type TSchoolClass = "Class 6" | "Class 7" | "Class 8" | "Class 9" | "Class 10";
export type TStudentGroup = "Science" | "Humanities" | "Business Studies" | "";

export interface IStudent {
  user?: Types.ObjectId;
  name: string;
  studentId: string;
  email?: string;
  contact: string;
  roll: number;
  class: string;
  section: string;
  group?: string;
  image?: string;
  imagePublicId?: string;
  fatherName?: string;
  motherName?: string;
  address: string;
  dob?: string;
  gender: "male" | "female" | "other";
  admissionDate?: string;
  isOnline?: boolean;
  isDeleted: boolean;
}