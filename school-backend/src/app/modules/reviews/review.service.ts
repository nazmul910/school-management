import ApiError from "../../utils/AppError";
import { Review } from "./reviews.model";
import { IReview } from "./reviews.interface";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

export const createReviewDB = async (data: IReview, user?: JwtPayload) => {
  const payload: Partial<IReview> = { ...data };
  if (user?.userId) {
    payload.user = user.userId;
  }
  return Review.create(payload);
};

export const getAllReviewsDB = async (status?: string) => {
  const query: Record<string, any> = {};
  if (status && status !== "all") {
    query.status = status;
  }
  return Review.find(query).sort({ createdAt: -1 });
};

export const getMyReviewsDB = async (user: JwtPayload) => {
  return Review.find({ user: user.userId }).sort({ createdAt: -1 });
};

export const changeStatus = async (
  id: string,
  payload: { status: "approved" | "pending" }
) => {
  const result = await Review.findOneAndUpdate(
    { _id: id },
    { status: payload.status },
    { new: true }
  );
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, "Review Not Found or Deleted");
  return result;
};

export const deleteReviewDB = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, "Review Not Found or Deleted");
  return result;
};
