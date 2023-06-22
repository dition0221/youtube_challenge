import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, login } from "../controllers/userController";

/* Router */
const rootRouter = express.Router();

/* controller */
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);

export default rootRouter;
