import express from "express";
import { registerView, createComment } from "../controllers/videoController";

const apiRouter = express.Router();

/* Routes */
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView); // 조회수
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment); // 댓글

export default apiRouter;
