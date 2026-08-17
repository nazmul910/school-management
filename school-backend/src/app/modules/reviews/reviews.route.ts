import express from "express";
import * as ReviewController from "./reviews.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.get("/", ReviewController.getAllReviews);
router.get("/my-reviews", auth(USER_ROLE.student), ReviewController.getMyReviews);
router.post("/", ReviewController.createReview);
router.patch("/change-status/:id", auth(USER_ROLE.admin), ReviewController.changeStatus);
router.delete("/:id", auth(USER_ROLE.admin), ReviewController.deleteReview);

export const reviewRouter = router;
