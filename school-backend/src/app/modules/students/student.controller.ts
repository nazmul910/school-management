import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { StudentServices } from "./student.service";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.createStudentToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student added successfully",
    data: result,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

const getSingleStudentUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student profile retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.updateSingleStudentToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

const getOnlineStudentsCount = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getOnlineStudentsCount();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Online student count retrieved successfully",
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  getSingleStudentUser,
  updateStudent,
  deleteStudent,
  getOnlineStudentsCount,
};
