import ApiError from "../../utils/AppError";
import httpStatus from "http-status";
import { IResult } from "./results.interface";
import { Result } from "./results.model";

// Calculate grade and GPA from mark
export const calculateGradeAndGPA = (mark: number): { grade: string; gpa: number } => {
  if (mark >= 80) return { grade: "A+", gpa: 5.0 };
  if (mark >= 70) return { grade: "A", gpa: 4.0 };
  if (mark >= 60) return { grade: "A-", gpa: 3.5 };
  if (mark >= 50) return { grade: "B+", gpa: 3.25 };
  if (mark >= 40) return { grade: "B", gpa: 3.0 };
  if (mark >= 33) return { grade: "C", gpa: 2.0 };
  return { grade: "F", gpa: 0.0 };
};

// Calculate overall GPA and Grade
export const calculateOverallResult = (subjectMarks: Array<{ marks: number }>) => {
  if (!subjectMarks || subjectMarks.length === 0) {
    return { totalMarks: 0, gpa: 0, grade: "F" };
  }
  let totalMarks = 0;
  let totalGPA = 0;
  let hasFailed = false;

  subjectMarks.forEach((sub) => {
    totalMarks += sub.marks;
    const { grade, gpa } = calculateGradeAndGPA(sub.marks);
    if (grade === "F") hasFailed = true;
    totalGPA += gpa;
  });

  const avgGPA = Number((totalGPA / subjectMarks.length).toFixed(2));
  let overallGrade = "A+";
  if (hasFailed || avgGPA < 1.0) {
    overallGrade = "F";
  } else if (avgGPA >= 5.0) {
    overallGrade = "A+";
  } else if (avgGPA >= 4.0) {
    overallGrade = "A";
  } else if (avgGPA >= 3.5) {
    overallGrade = "A-";
  } else if (avgGPA >= 3.25) {
    overallGrade = "B+";
  } else if (avgGPA >= 3.0) {
    overallGrade = "B";
  } else {
    overallGrade = "C";
  }

  return { totalMarks, gpa: hasFailed ? 0.0 : avgGPA, grade: overallGrade };
};

// Create Result
const createResultToDB = async (payload: IResult) => {
  if (payload.subjectMarks && payload.subjectMarks.length > 0) {
    payload.subjectMarks = payload.subjectMarks.map((sm) => {
      const { grade, gpa } = calculateGradeAndGPA(sm.marks);
      return { ...sm, grade, gpa };
    });
    const calculated = calculateOverallResult(payload.subjectMarks);
    payload.totalMarks = calculated.totalMarks;
    payload.gpa = calculated.gpa;
    payload.grade = calculated.grade;
  }

  const result = await Result.create(payload);
  await recalculateClassPositions(payload.class, payload.examType, payload.examYear);
  return result;
};

// Recalculate rank/position for a class & exam
const recalculateClassPositions = async (className: string, examType: string, examYear: string) => {
  const classResults = await Result.find({
    class: className,
    examType: examType,
    examYear: examYear,
    isDeleted: false,
  }).sort({ totalMarks: -1 });

  for (let i = 0; i < classResults.length; i++) {
    await Result.findByIdAndUpdate(classResults[i]._id, { position: i + 1 });
  }
};

// Get All Results (with query filter)
const getAllResultsFromDB = async (query: Record<string, any> = {}) => {
  const filter: Record<string, any> = { isDeleted: false };
  if (query.class && query.class !== "all") filter.class = query.class;
  if (query.examType) filter.examType = query.examType;
  if (query.examYear) filter.examYear = query.examYear;
  if (query.roll) filter.studentRoll = Number(query.roll);
  if (query.isFinalExam !== undefined) filter.isFinalExam = query.isFinalExam === "true";

  const results = await Result.find(filter).sort({ class: 1, position: 1, totalMarks: -1 });
  return results;
};

// Search single student result
const searchStudentResultFromDB = async (query: {
  class: string;
  roll: number;
  examType?: string;
  examYear?: string;
}) => {
  const filter: Record<string, any> = {
    class: query.class,
    studentRoll: Number(query.roll),
    isDeleted: false,
  };
  if (query.examType) filter.examType = query.examType;
  if (query.examYear) filter.examYear = query.examYear;

  const result = await Result.findOne(filter).sort({ createdAt: -1 });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Result not found");
  return result;
};

// Get Top 10 for each class (Class 6 to Class 10)
const getTop10ResultsFromDB = async (examYear: string = "2025") => {
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const top10Map: Record<string, any[]> = {};

  for (const cls of classes) {
    const topStudents = await Result.find({
      class: cls,
      isTop10Eligible: true,
      isDeleted: false,
    })
      .sort({ totalMarks: -1, gpa: -1 })
      .limit(10);

    top10Map[cls] = topStudents.map((item, index) => ({
      ...item.toObject(),
      position: index + 1,
    }));
  }

  return top10Map;
};

const getSingleResultFromDB = async (id: string) => {
  const result = await Result.findOne({ _id: id, isDeleted: false });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Result Not Found");
  return result;
};

const updateSingleResultToDB = async (id: string, payload: Partial<IResult>) => {
  const isExists = await Result.findOne({ _id: id, isDeleted: false });
  if (!isExists) throw new ApiError(httpStatus.NOT_FOUND, "Result Not Found!");

  if (payload.subjectMarks && payload.subjectMarks.length > 0) {
    payload.subjectMarks = payload.subjectMarks.map((sm) => {
      const { grade, gpa } = calculateGradeAndGPA(sm.marks);
      return { ...sm, grade, gpa };
    });
    const calculated = calculateOverallResult(payload.subjectMarks);
    payload.totalMarks = calculated.totalMarks;
    payload.gpa = calculated.gpa;
    payload.grade = calculated.grade;
  }

  const result = await Result.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (result) {
    await recalculateClassPositions(result.class, result.examType, result.examYear);
  }
  return result;
};

const deleteSingleResultToDB = async (id: string) => {
  const isExists = await Result.findOne({ _id: id, isDeleted: false });
  if (!isExists) throw new ApiError(httpStatus.NOT_FOUND, "Result Not Found!");
  const result = await Result.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const ResultServices = {
  createResultToDB,
  getAllResultsFromDB,
  searchStudentResultFromDB,
  getTop10ResultsFromDB,
  getSingleResultFromDB,
  updateSingleResultToDB,
  deleteSingleResultToDB,
};
