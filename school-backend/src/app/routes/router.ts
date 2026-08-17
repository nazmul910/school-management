import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { noticeRouter } from "../modules/notice/notice.route";
import { reviewRouter } from "../modules/reviews/reviews.route";
import { StudentRouter } from "../modules/students/student.route";
import { teacherRouter } from "../modules/teachers/teachers.route";
import { userRouter } from "../modules/users/user.route";
import { mailRouter } from "../modules/mails/mails.route";
import { galleryRouter } from "../modules/gallery/gallery.route";
import { resultRouter } from "../modules/results/results.route";
import { dashboardRouter } from "../modules/dashboard/dashboard.route";
import { uploadRouter } from "../modules/upload/upload.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/students",
    route: StudentRouter,
  },
  {
    path: "/teachers",
    route: teacherRouter,
  },
  {
    path: "/notices",
    route: noticeRouter,
  },
  {
    path: "/gallery",
    route: galleryRouter,
  },
  {
    path: "/results",
    route: resultRouter,
  },
  {
    path: "/reviews",
    route: reviewRouter,
  },
  {
    path: "/dashboard",
    route: dashboardRouter,
  },
  {
    path: "/upload",
    route: uploadRouter,
  },
  {
    path: "/mails",
    route: mailRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
