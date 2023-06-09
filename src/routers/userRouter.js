import express from "express";
import { edit, deleteUser, see, logout } from "../controllers/userController";

/* Router */
const userRouter = express.Router();

/* controller */
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get(":id", see);

export default userRouter;
