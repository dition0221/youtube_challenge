import "dotenv/config"; // dotenv
// DB
import "./db";
// DB Models
import "./models/Video";
import "./models/User";
import "./models/Comment";
// Server
import app from "./server";

// 서버의 port 번호
const PORT = 4000;

/* 서버 실행 */
app.listen(PORT, () =>
  console.log(`✅ Server Connected: http://localhost:${PORT} 🚀`)
);
