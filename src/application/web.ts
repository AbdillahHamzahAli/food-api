import express from "express";
import { publicRouter } from "../route/public-api";
import { ErrorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";

const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(apiRouter);
app.use(ErrorMiddleware);

export default app;
