import express, { Request, Response } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

const router = express.Router();

// Single file upload
router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const file = req.file || files?.file?.[0] || files?.image?.[0];

    if (!file) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "No file uploaded",
        data: null,
      });
    }

    const customFolder = (req.body.folder as string) || (req.query.folder as string);
    const isPdf = file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf");
    const targetFolder = customFolder || (isPdf ? "school_notices" : "school_uploads");

    try {
      const uploadResult = await uploadToCloudinary(
        file.buffer,
        targetFolder,
        isPdf ? "raw" : "image"
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "File uploaded successfully",
        data: {
          url: uploadResult.secure_url || uploadResult.url,
          publicId: uploadResult.public_id,
          format: uploadResult.format || (isPdf ? "pdf" : "jpg"),
          originalName: file.originalname,
        },
      });
    } catch (uploadError: any) {
      console.error("Cloudinary upload error:", uploadError);
      // Fallback base64 data URI if Cloudinary encounters an error
      const base64 = file.buffer.toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64}`;
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "File converted to data URI",
        data: {
          url: dataUri,
          publicId: `local_${Date.now()}`,
          format: file.mimetype.split("/")[1] || "file",
          originalName: file.originalname,
        },
      });
    }
  })
);

// Multiple files upload
router.post(
  "/multiple",
  upload.fields([
    { name: "files", maxCount: 20 },
    { name: "images", maxCount: 20 },
    { name: "file", maxCount: 20 },
  ]),
  catchAsync(async (req: Request, res: Response) => {
    const filesMap = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const filesList = [
      ...(filesMap?.files || []),
      ...(filesMap?.images || []),
      ...(filesMap?.file || []),
      ...((req as any).files && Array.isArray((req as any).files) ? (req as any).files : []),
    ];

    if (!filesList || filesList.length === 0) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "No files uploaded",
        data: null,
      });
    }

    const customFolder = (req.body.folder as string) || (req.query.folder as string) || "school_gallery";

    const uploadPromises = filesList.map(async (file) => {
      const isPdf = file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf");
      try {
        const uploadResult = await uploadToCloudinary(
          file.buffer,
          customFolder,
          isPdf ? "raw" : "image"
        );
        return {
          url: uploadResult.secure_url || uploadResult.url,
          publicId: uploadResult.public_id,
          format: uploadResult.format || (isPdf ? "pdf" : "jpg"),
          originalName: file.originalname,
        };
      } catch (err) {
        console.error("Cloudinary upload item error:", err);
        const base64 = file.buffer.toString("base64");
        return {
          url: `data:${file.mimetype};base64,${base64}`,
          publicId: `local_${Date.now()}_${Math.random()}`,
          format: file.mimetype.split("/")[1] || "file",
          originalName: file.originalname,
        };
      }
    });

    const results = await Promise.all(uploadPromises);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${results.length} files uploaded successfully`,
      data: results,
    });
  })
);

export const uploadRouter = router;

