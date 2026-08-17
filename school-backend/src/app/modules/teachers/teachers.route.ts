import express from "express";
import { TeacherController } from "./teachers.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), TeacherController.createTeacher);
router.get("/", TeacherController.getAllTeachers);
router.get("/:id", TeacherController.getSingleTeacher);
router.put("/:id", auth(USER_ROLE.admin), TeacherController.updateTeacher);
router.delete("/:id", auth(USER_ROLE.admin), TeacherController.deleteTeacher);

export const teacherRouter = router;