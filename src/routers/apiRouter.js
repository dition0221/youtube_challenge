import express from "express";
import { registerView } from "../controllers/videoController";

const apiRouter = express.Router();

/* Routes */
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView); // 조회수

export default apiRouter;
