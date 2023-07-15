import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import Video from "./models/Video";

// Local or Deploy
const isFlyio = process.env.NODE_ENV === "production";

/* AWS Object */
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

/* multerS3 Object */
const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "dition-wetube",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    const folderName = "images";
    const fileName = Date.now() + "-" + file.originalname;
    const fullPath = folderName + "/" + fileName;
    cb(null, fullPath);
  },
});
const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "dition-wetube",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    const folderName = "videos";
    const fileName = Date.now() + "-" + file.originalname.replace(/\..*$/, "");
    const fullPath = folderName + "/" + fileName;
    cb(null, fullPath);
  },
});

/* 'res.locals' object */
export const localsMiddleware = (req, res, next) => {
  // website
  res.locals.siteName = "WeTube";
  // user
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isFlyio = isFlyio;
  next();
};

/* Allow login user & Forbid logout user */
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

/* Allow logout user & Forbid login user */
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized.");
    return res.redirect("/");
  }
};

/* Upload file */
export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 }, // 3MB
  storage: isFlyio ? s3ImageUploader : undefined,
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 12000000 }, // 12MB
  storage: isFlyio ? s3VideoUploader : undefined,
});

/* Delete ex-file on AWS */
export const deleteAvatarMiddleware = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const key = `images/${req.session.user.avatarUrl.split("/")[4]}`;
  const params = {
    Bucket: "dition-wetube",
    Key: key,
  };
  try {
    const data = await s3.send(new DeleteObjectCommand(params));
    console.log("Success. Object deleted.", data);
  } catch (err) {
    console.log("Error", err);
    return res.redirect("/users/edit");
  }
  next();
};
export const deleteVideoMiddleware = async (req, res, next) => {
  const { id } = req.params; // video id
  const video = await Video.findById(id);
  if (!video) {
    return next();
  }
  const key1 = `videos/${video.fileUrl.split("/")[4].replace("+", " ")}`;
  const key2 = `videos/${video.thumbUrl.split("/")[4].replace("+", " ")}`;
  const params1 = {
    Bucket: "dition-wetube",
    Key: key1,
  };
  const params2 = {
    Bucket: "dition-wetube",
    Key: key2,
  };
  try {
    const data1 = await s3.send(new DeleteObjectCommand(params1));
    const data2 = await s3.send(new DeleteObjectCommand(params2));
    console.log("Success. Object deleted.", data1, data2);
  } catch (err) {
    console.log("Error", err);
    return res.redirect("/");
  }
  next();
};
