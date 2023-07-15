import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
import {
  deleteAvatarMiddleware,
  protectorMiddleware,
  videoUpload,
} from "../middlewares";

const videoRouter = express.Router();

/* Routes */
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(
    videoUpload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumb", maxCount: 1 },
    ]),
    postUpload
  );
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(deleteAvatarMiddleware, postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);

export default videoRouter;
