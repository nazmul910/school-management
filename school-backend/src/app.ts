import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes/router";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());
app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("School Management System API is running");
});
export default app;
