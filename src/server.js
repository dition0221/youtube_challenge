import express from "express"; // Server
import morgan from "morgan"; // Middleware - Logger
import session from "express-session"; // Middleware - Session
// Routers
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

/* 서버(Express App) 생성 */
const app = express();

/* Middleware */
// Morgan - logger
const loggerMiddleware = morgan("dev");
app.use(loggerMiddleware);
// Pug - View Engine
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // Path of 'views' folder
// URL Encode - POST form
app.use(express.urlencoded({ extended: true }));
// Session
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);
// 'res.locals' object - with using session
app.use(localsMiddleware);

/* Routers */
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
