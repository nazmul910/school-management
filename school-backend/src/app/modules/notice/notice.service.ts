import ApiError from "../../utils/AppError";
import httpStatus from "http-status";
import { INotice } from "./notice.interface";
import { Notice } from "./notice.model";

const createNoticeToDB = async (payload: INotice) => {
  if (!payload.publishDate) {
    payload.publishDate = new Date().toISOString().split("T")[0];
  }
  const result = await Notice.create(payload);
  return result;
};

const getAllNoticesFromDB = async () => {
  const result = await Notice.find({ isDeleted: false }).sort({ isPinned: -1, createdAt: -1 });
  return result;
};

const getSingleNoticeFromDB = async (id: string) => {
  const result = await Notice.findOne({ _id: id, isDeleted: false });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Notice Not Found");
  return result;
};

const updateSingleNoticeToDB = async (id: string, payload: Partial<INotice>) => {
  const isNoticeExists = await Notice.findOne({ _id: id, isDeleted: false });
  if (!isNoticeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notice Not Found!");
  }
  const result = await Notice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleNoticeToDB = async (id: string) => {
  const isNoticeExists = await Notice.findOne({ _id: id, isDeleted: false });
  if (!isNoticeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notice Not Found!");
  }
  const result = await Notice.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const NoticeServices = {
  createNoticeToDB,
  getAllNoticesFromDB,
  getSingleNoticeFromDB,
  updateSingleNoticeToDB,
  deleteSingleNoticeToDB,
};
