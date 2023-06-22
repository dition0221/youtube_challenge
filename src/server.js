import express from "express"; // Server
import morgan from "morgan"; // Middleware - Logger
// Routers
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

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

/* Routers */
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
