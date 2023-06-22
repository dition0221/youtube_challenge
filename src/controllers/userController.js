// DB Models
import User from "../models/User";

/* Join(GET) - root router */
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

/* Join(POST) - root router */
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  const pageTitle = "Join";
  // Check PW
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "Password confirmation doesn't match.",
    });
  }
  // Check unique
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  // Save user to DB
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};

/* Log In - root router */
export const login = (req, res) => res.send("Log In 🔑");

/* Log Out */
export const logout = (req, res) => res.send("Log Out");

/* See User */
export const see = (req, res) => res.send("See User Profile");

/* Edit User */
export const edit = (req, res) => res.send("Edit User 😋");

/* Delete User */
export const deleteUser = (req, res) => res.send("Delete User 😭❌");
