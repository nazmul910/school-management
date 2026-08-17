import { model, Schema } from "mongoose";
import { IResult, ISubjectMark } from "./results.interface";

const subjectMarkSchema = new Schema<ISubjectMark>(
  {
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    grade: { type: String, default: "A+" },
    gpa: { type: Number, default: 5.0 },
  },
  { _id: false }
);

const resultSchema = new Schema<IResult>(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student" },
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    studentRoll: { type: Number, required: true },
    studentImage: { type: String, default: "" },
    class: { type: String, required: true },
    section: { type: String, default: "A" },
    group: { type: String, default: "" },
    examType: { type: String, required: true, default: "Final Examination" },
    examYear: { type: String, required: true, default: "2025" },
    subjectMarks: { type: [subjectMarkSchema], default: [] },
    totalMarks: { type: Number, required: true },
    gpa: { type: Number, required: true },
    grade: { type: String, required: true },
    position: { type: Number, default: 1 },
    isFinalExam: { type: Boolean, default: true },
    isTop10Eligible: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Result = model<IResult>("Result", resultSchema);
