import ApiError from "../../utils/AppError";
import httpStatus from "http-status";
import { IGallery } from "./gallery.interface";
import { Gallery } from "./gallery.model";

const createGalleryItemToDB = async (payload: IGallery | IGallery[] | { items: IGallery[] }) => {
  if (Array.isArray(payload)) {
    const result = await Gallery.insertMany(payload);
    return result;
  }
  if ((payload as any).items && Array.isArray((payload as any).items)) {
    const result = await Gallery.insertMany((payload as any).items);
    return result;
  }
  const result = await Gallery.create(payload);
  return result;
};

const getAllGalleryItemsFromDB = async (category?: string) => {
  const query: Record<string, any> = { isDeleted: false };
  if (category && category !== "all") {
    query.category = category;
  }
  const result = await Gallery.find(query).sort({ createdAt: -1 });
  return result;
};

const getSingleGalleryItemFromDB = async (id: string) => {
  const result = await Gallery.findOne({ _id: id, isDeleted: false });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Gallery item not found");
  return result;
};

const updateSingleGalleryItemToDB = async (id: string, payload: Partial<IGallery>) => {
  const isExists = await Gallery.findOne({ _id: id, isDeleted: false });
  if (!isExists) throw new ApiError(httpStatus.NOT_FOUND, "Gallery item not found!");
  const result = await Gallery.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleGalleryItemToDB = async (id: string) => {
  const isExists = await Gallery.findOne({ _id: id, isDeleted: false });
  if (!isExists) throw new ApiError(httpStatus.NOT_FOUND, "Gallery item not found!");
  const result = await Gallery.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const GalleryServices = {
  createGalleryItemToDB,
  getAllGalleryItemsFromDB,
  getSingleGalleryItemFromDB,
  updateSingleGalleryItemToDB,
  deleteSingleGalleryItemToDB,
};
