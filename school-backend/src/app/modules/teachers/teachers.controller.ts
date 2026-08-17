import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { TeacherServices } from "./teachers.service";

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.createTeacherToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Teacher added successfully",
    data: result,
  });
});

const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.getAllTeachersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teachers retrieved successfully",
    data: result,
  });
});

const getSingleTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherServices.getSingleTeacherFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher retrieved successfully",
    data: result,
  });
});

const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherServices.updateSingleTeacherToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher updated successfully",
    data: result,
  });
});

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherServices.deleteSingleTeacherToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher deleted successfully",
    data: result,
  });
});

export const TeacherController = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};