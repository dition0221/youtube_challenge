import express from "express"; // Server
import morgan from "morgan"; // Middleware - Logger
/* Router */
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// 서버의 port 번호
const PORT = 4000;

/* 서버(Express App) 생성 */
const app = express();

/* Middleware */
// Morgan - logger
const loggerMiddleware = morgan("dev");
app.use(loggerMiddleware);

/* Router */
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

/* 서버 실행 */
app.listen(PORT, () =>
  console.log(`✅ Server Connected: http://localhost:${PORT} 🚀`)
);
