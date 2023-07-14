import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

/* Routes */
// 조회수
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
// 댓글 생성/삭제
apiRouter
  .route("/videos/:id([0-9a-f]{24})/comment")
  .post(createComment)
  .delete(deleteComment);

export default apiRouter;
