import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String },
  name: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: { type: String },
});

// Middleware - PW Hashing
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
