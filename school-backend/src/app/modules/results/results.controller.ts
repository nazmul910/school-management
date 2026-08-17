import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { ResultServices } from "./results.service";

const createResult = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultServices.createResultToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Result created successfully",
    data: result,
  });
});

const getAllResults = catchAsync(async (req: Request, res: Response) => {
  const result = await ResultServices.getAllResultsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Results retrieved successfully",
    data: result,
  });
});

const getTop10Results = catchAsync(async (req: Request, res: Response) => {
  const { year } = req.query;
  const result = await ResultServices.getTop10ResultsFromDB((year as string) || "2025");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Top 10 results retrieved successfully",
    data: result,
  });
});

const searchStudentResult = catchAsync(async (req: Request, res: Response) => {
  const { className, roll, examType, examYear } = req.query;
  const result = await ResultServices.searchStudentResultFromDB({
    class: className as string,
    roll: Number(roll),
    examType: examType as string,
    examYear: examYear as string,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student result found successfully",
    data: result,
  });
});

const getSingleResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ResultServices.getSingleResultFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result retrieved successfully",
    data: result,
  });
});

const updateResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ResultServices.updateSingleResultToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result updated successfully",
    data: result,
  });
});

const deleteResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ResultServices.deleteSingleResultToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result deleted successfully",
    data: result,
  });
});

export const ResultController = {
  createResult,
  getAllResults,
  getTop10Results,
  searchStudentResult,
  getSingleResult,
  updateResult,
  deleteResult,
};
