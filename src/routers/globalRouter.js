import express from "express";
import { home } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

/* Router */
const globalRouter = express.Router();

/* controller */
globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
