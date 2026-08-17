import express from "express";
import { ResultController } from "./results.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.get("/top-10", ResultController.getTop10Results);
router.get("/search", ResultController.searchStudentResult);
router.post("/", auth(USER_ROLE.admin), ResultController.createResult);
router.get("/", ResultController.getAllResults);
router.get("/:id", ResultController.getSingleResult);
router.put("/:id", auth(USER_ROLE.admin), ResultController.updateResult);
router.delete("/:id", auth(USER_ROLE.admin), ResultController.deleteResult);

export const resultRouter = router;
