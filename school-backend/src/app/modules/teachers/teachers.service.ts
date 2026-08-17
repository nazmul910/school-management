import ApiError from "../../utils/AppError";
import httpStatus from "http-status";
import { ITeacher } from "./teachers.interface";
import { Teacher } from "./teachers.model";

const createTeacherToDB = async (payload: ITeacher) => {
  if (!payload.teacherId) {
    const count = await Teacher.countDocuments();
    payload.teacherId = `TCH-${(count + 1).toString().padStart(3, "0")}`;
  }
  const result = await Teacher.create(payload);
  return result;
};

const getAllTeachersFromDB = async () => {
  const result = await Teacher.find({ isDeleted: false }).sort({ createdAt: -1 });
  return result;
};

const getSingleTeacherFromDB = async (id: string) => {
  const result = await Teacher.findOne({ _id: id, isDeleted: false });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Teacher Not Found");
  return result;
};

const updateSingleTeacherToDB = async (id: string, payload: Partial<ITeacher>) => {
  const isTeacherExists = await Teacher.findOne({ _id: id, isDeleted: false });
  if (!isTeacherExists)
    throw new ApiError(httpStatus.NOT_FOUND, "Teacher Not Found!");
  const result = await Teacher.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleTeacherToDB = async (id: string) => {
  const isTeacherExists = await Teacher.findOne({ _id: id, isDeleted: false });
  if (!isTeacherExists)
    throw new ApiError(httpStatus.NOT_FOUND, "Teacher Not Found!");
  const result = await Teacher.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const TeacherServices = {
  createTeacherToDB,
  getAllTeachersFromDB,
  getSingleTeacherFromDB,
  updateSingleTeacherToDB,
  deleteSingleTeacherToDB,
};