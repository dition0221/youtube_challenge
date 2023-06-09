import express from "express";
import {
  watch,
  edit,
  deleteVideo,
  upload,
} from "../controllers/videoController";

/* Router */
const videoRouter = express.Router();

/* Controller */
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
