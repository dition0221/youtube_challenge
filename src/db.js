import mongoose from "mongoose";

/* Connect MongoDB */
mongoose.connect(process.env.DB_URL);

/* Log - Connection */
const db = mongoose.connection;
db.on("error", (error) => console.log("❌ DB Error: ", error));
db.once("open", () => console.log("✅ Connected to DB"));
