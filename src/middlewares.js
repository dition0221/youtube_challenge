import multer from "multer";

/* 'res.locals' object */
export const localsMiddleware = (req, res, next) => {
  // website
  res.locals.siteName = "WeTube";
  // user
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

/* Allow login user & Forbid logout user */
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

/* Allow logout user & Forbid login user */
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

/* Upload avatar file */
export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 }, // 3MB
});

/* Upload video file */
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 12000000 }, // 12MB
});
