import express from "express";
import {
  logout,
  edit,
  deleteUser,
  startGithubLogin,
  finishGithubLogin,
  see,
} from "../controllers/userController";

/* Router */
const userRouter = express.Router();

/* controller */
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;
