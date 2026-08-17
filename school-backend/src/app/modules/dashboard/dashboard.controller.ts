import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { DashboardServices } from "./dashboard.service";

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardServices.getDashboardStatsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully",
    data: result,
  });
});

export const DashboardController = {
  getDashboardStats,
};
