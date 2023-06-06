import express from "express";

// 서버의 port 번호
const PORT = 4000;

/* 서버(express app) 생성 */
const app = express();

/* Router */
app.get("/", (req, res) => res.send("Home 💒"));
app.get("/login", (req, res) => res.send("Login 🔑"));

/* 서버 실행 */
app.listen(PORT, () =>
  console.log(`✅ Server Connected: http://localhost:${PORT}`)
);
