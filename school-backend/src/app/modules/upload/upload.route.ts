import express, { Request, Response } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

const router = express.Router();

router.post(
  "/",
  upload.single("file"),
  catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "No file uploaded",
        data: null,
      });
    }

    try {
      const isPdf = req.file.mimetype === "application/pdf" || req.file.originalname.endsWith(".pdf");
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        isPdf ? "school_notices" : "school_gallery",
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
          originalName: req.file.originalname,
        },
      });
    } catch (uploadError: any) {
      // Fallback base64 data URI if Cloudinary encounters an error
      const base64 = req.file.buffer.toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64}`;
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "File converted to data URI",
        data: {
          url: dataUri,
          publicId: `local_${Date.now()}`,
          format: req.file.mimetype.split("/")[1] || "file",
          originalName: req.file.originalname,
        },
      });
    }
  })
);

export const uploadRouter = router;
