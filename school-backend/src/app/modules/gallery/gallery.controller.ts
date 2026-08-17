import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { GalleryServices } from "./gallery.service";

const createGalleryItem = catchAsync(async (req: Request, res: Response) => {
  const result = await GalleryServices.createGalleryItemToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Gallery image uploaded successfully",
    data: result,
  });
});

const getAllGalleryItems = catchAsync(async (req: Request, res: Response) => {
  const { category } = req.query;
  const result = await GalleryServices.getAllGalleryItemsFromDB(category as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery items retrieved successfully",
    data: result,
  });
});

const getSingleGalleryItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GalleryServices.getSingleGalleryItemFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery item retrieved successfully",
    data: result,
  });
});

const updateGalleryItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GalleryServices.updateSingleGalleryItemToDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery item updated successfully",
    data: result,
  });
});

const deleteGalleryItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GalleryServices.deleteSingleGalleryItemToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery item deleted successfully",
    data: result,
  });
});

export const GalleryController = {
  createGalleryItem,
  getAllGalleryItems,
  getSingleGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
