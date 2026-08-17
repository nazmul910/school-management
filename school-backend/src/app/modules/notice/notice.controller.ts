import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { NoticeServices } from "./notice.service";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.createNoticeToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notice created successfully",
    data: result,
  });
});

const getAllNotices = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.getAllNoticesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notices retrieved successfully",
    data: result,
  });
});

const getSingleNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeServices.getSingleNoticeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice retrieved successfully",
    data: result,
  });
});

const updateNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeServices.updateSingleNoticeToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice updated successfully",
    data: result,
  });
});

const deleteNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeServices.deleteSingleNoticeToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice deleted successfully",
    data: result,
  });
});

export const NoticeController = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};
