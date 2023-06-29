// packages
import bcrypt from "bcrypt";
import fetch from "cross-fetch";
// DB Models
import User from "../models/User";
import Video from "../models/Video";

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
  const user = await User.findOne({ username, socialOnly: false });
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
  // Config token
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  // POST request - get 'access_token'
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  // Using API with 'access_token' to bring user info.
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      // Error: don't have email
      // ! Set notification
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    // Success: if no account, Create new account
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        username: userData.login,
        password: userData.node_id,
        name: userData.name ? userData.name : userData.login,
        location: userData.location ? userData.location : "",
        socialOnly: true,
        avatarUrl: userData.avatar_url,
      });
    }
    // Success: Log In
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // Error: no 'access_token'
    return res.redirect("/login");
  }
};

/* Log Out */
export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

/* Edit User (GET) */
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

/* Edit User (POST) */
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;
  // Check duplication (email, username)
  const findUsername = await User.findOne({ username });
  const findEmail = await User.findOne({ email });
  if (findUsername && _id !== findUsername._id.toString()) {
    return res.render("edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: "Username already exists.",
    });
  }
  if (findEmail && _id !== findEmail._id.toString()) {
    return res.render("edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: "Email already exists.",
    });
  }
  // Update DB
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  // Update Session
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

/* Change PW (GET) */
export const getChangePassword = (req, res) => {
  // if social account, don't render
  if (req.session.user.socialOnly) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

/* Change PW (POST) */
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  // Check new PW
  if (newPassword !== newPasswordConfirmation || !newPassword) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "New password confirmation doesn't match.",
    });
  }
  // Check old PW
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect.",
    });
  }
  // Update PW to DB
  user.password = newPassword;
  await user.save();
  // Go logout (No need to Update session)
  return res.redirect("/users/logout"); // ! send notification
};

/* See User Profile */
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
    videos: user.videos,
  });
};
