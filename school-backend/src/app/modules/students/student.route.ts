import express from "express";
import { StudentController } from "./student.controller";
import auth from "../../middleware/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.get("/online-count", StudentController.getOnlineStudentsCount);
router.post("/", auth(USER_ROLE.admin), StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/user/:id", auth(USER_ROLE.admin, USER_ROLE.student), StudentController.getSingleStudentUser);
router.get("/:id", StudentController.getSingleStudent);
router.put("/:id", auth(USER_ROLE.admin, USER_ROLE.student), StudentController.updateStudent);
router.delete("/:id", auth(USER_ROLE.admin), StudentController.deleteStudent);

export const StudentRouter = router;
