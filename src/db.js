import mongoose from "mongoose";

/* Connect MongoDB */
mongoose.connect("mongodb://127.0.0.1:27017/wetube");

/* Log - Connection */
const db = mongoose.connection;
db.on("error", (error) => console.log("❌ DB Error: ", error));
db.once("open", () => console.log("✅ Connected to DB"));
