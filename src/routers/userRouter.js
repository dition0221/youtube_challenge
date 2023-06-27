import express from "express";
import {
  edit,
  startGithubLogin,
  finishGithubLogin,
  logout,
  see,
} from "../controllers/userController";

/* Router */
const userRouter = express.Router();

/* controller */
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);
userRouter.get(":id", see);

export default userRouter;
