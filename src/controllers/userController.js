// packages
import bcrypt from "bcrypt";
import fetch from "node-fetch";
// DB Models
import User from "../models/User";
import { response } from "express";

/* Join(GET) - root router */
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

/* Join(POST) - root router */
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  const pageTitle = "Join";
  // Check PW
  if (password !== password2 || !password) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation doesn't match.",
    });
  }
  // Check unique
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  // Save user to DB
  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

/* Log In(GET) - root router */
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

/* Log In(POST) - root router */
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Log In";
  // Check username
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username doesn't exists.",
    });
  // Check PW
  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong Password.",
    });
  // Success
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

/* Github Login (Start) */
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

/* Github Login (Finish) */
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  // POST request
  /*
  const json = fetch(finalUrl, {
    method: "POST",
    headers: { Accept: "application/json" },
  }).then((response) => response.json());
  */
  const data = await fetch(finalUrl, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const json = await data.json();
  console.log(json);
  res.end();
};

/* Log Out */
export const logout = (req, res) => res.send("Log Out");

/* See User */
export const see = (req, res) => res.send("See User Profile");

/* Edit User */
export const edit = (req, res) => res.send("Edit User 😋");

/* Delete User */
export const deleteUser = (req, res) => res.send("Delete User 😭❌");
