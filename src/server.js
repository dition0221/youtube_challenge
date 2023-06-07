import express from "express"; // Server
import morgan from "morgan"; // Middleware - Log

// 서버의 port 번호
const PORT = 4000;

/* 서버(Express App) 생성 */
const app = express();

/* 미들웨어(Middleware) */
// Morgan - logger
const loggerMiddleware = morgan("dev");
app.use(loggerMiddleware);

/* Router */
app.get("/", (req, res) => res.send("Home 💒"));

/* 서버 실행 */
app.listen(PORT, () =>
  console.log(`✅ Server Connected: http://localhost:${PORT} 🚀`)
);
