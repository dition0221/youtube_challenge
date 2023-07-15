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
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

/* 서버 실행 */
app.listen(PORT, HOST, () =>
  console.log(`✅ Server Connected: http://localhost:${PORT} 🚀`)
);
