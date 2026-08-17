import { Types } from "mongoose";

export interface ISubjectMark {
  subject: string;
  marks: number;
  grade?: string;
  gpa?: number;
}

export interface IResult {
  student?: Types.ObjectId;
  studentName: string;
  studentId: string;
  studentRoll: number;
  studentImage?: string;
  class: string;
  section: string;
  group?: string;
  examType: string;
  examYear: string;
  subjectMarks: ISubjectMark[];
  totalMarks: number;
  gpa: number;
  grade: string;
  position?: number;
  isFinalExam: boolean;
  isTop10Eligible: boolean;
  isDeleted: boolean;
}
