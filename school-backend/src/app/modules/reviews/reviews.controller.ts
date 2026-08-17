import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import * as ReviewService from "./review.service";

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReviewDB(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Feedback submitted successfully",
    data: result,
  });
});

export const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.query;
  const result = await ReviewService.getAllReviewsDB(status as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

export const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getMyReviewsDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My reviews retrieved successfully",
    data: result,
  });
});

export const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status changed successfully",
    data: result,
  });
});

export const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.deleteReviewDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});
