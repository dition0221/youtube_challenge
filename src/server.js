import express from "express"; // Server
// Middlewares
import morgan from "morgan"; //  Logger
import session from "express-session"; //  Session
import MongoStore from "connect-mongo"; // Save session to MongoDB
import { localsMiddleware } from "./middlewares";
// Routers
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

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
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // Save session to DB
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
// 'res.locals' object - with using session
app.use(localsMiddleware);
// FFmpeg: SharedArrayBuffer
app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

/* Allow showing files */
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));

/* Routers */
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
