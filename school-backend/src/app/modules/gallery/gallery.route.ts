import express from "express";
import { GalleryController } from "./gallery.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), GalleryController.createGalleryItem);
router.get("/", GalleryController.getAllGalleryItems);
router.get("/:id", GalleryController.getSingleGalleryItem);
router.put("/:id", auth(USER_ROLE.admin), GalleryController.updateGalleryItem);
router.delete("/:id", auth(USER_ROLE.admin), GalleryController.deleteGalleryItem);

export const galleryRouter = router;
