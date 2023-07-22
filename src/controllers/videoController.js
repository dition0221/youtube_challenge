// DB Models
import User from "../models/User";
import Video from "../models/Video";
import Comment from "./../models/Comment";
// AWS
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

/* Homepage - root router */
export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

/* Watch Video */
export const watch = async (req, res) => {
  // get video from DB
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  // if no video
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  // Success
  return res.render("watch", { pageTitle: video.title, video });
};

/* Edit Video (GET) */
export const getEdit = async (req, res) => {
  // Get video from DB
  const { id } = req.params;
  const video = await Video.findById(id);
  // if no video
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  // Check own user
  const {
    user: { _id },
  } = req.session;
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "It's not your video.");
    return res.status(403).redirect("/");
  }
  // Success
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

/* Edit Video (POST) */
export const postEdit = async (req, res) => {
  try {
    // Check video from DB
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video)
      return res.status(404).render("404", { pageTitle: "Video not found." });
    // Check own user
    const {
      user: { _id },
    } = req.session;
    if (String(video.owner) !== String(_id)) {
      req.flash("error", "You are not the owner of the video.");
      return res.status(403).redirect("/");
    }
    // Success: Update video to DB
    const { title, description, hashtags } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
      },
      { new: true }
    );
    if (!updatedVideo) {
      throw new Error("Failed to update video.");
    }
    req.flash("success", "Changes saved.");
    return res.redirect(`/videos/${id}`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to update video.");
    return res.status(500).render("404", { pageTitle: "Server Error" });
  }
};

/* Upload Video (GET) */
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

/* Upload Video (POST) */
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  const isFlyio = process.env.NODE_ENV === "production"; // Local or Deploy
  // Save to DB
  try {
    const newVideo = await Video.create({
      fileUrl: isFlyio
        ? video[0].location.replace(/\\\\/g, "/")
        : video[0].path.replace(/\\\\/g, "/"),
      thumbUrl: isFlyio
        ? thumb[0].location.replace(/\\\\/g, "/")
        : thumb[0].path.replace(/\\\\/g, "/"),
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

/* Delete Video */
export const deleteVideo = async (req, res) => {
  const { id } = req.params; // video id
  const {
    user: { _id },
  } = req.session; // user id
  const video = await Video.findById(id);
  // if no video
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  // Check own user
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  // Success: DB
  await Video.findByIdAndDelete(id); // Delete video
  const user = await User.findById(_id);
  user.videos.splice(user.videos.indexOf(id), 1);
  await user.save(); // Delete video in user's video list
  return res.redirect("/");
};

/* Search Video */
export const search = async (req, res) => {
  const { keyword } = req.query;
  // Search
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(keyword, "i") },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

/* API - Video's View (조회수) */
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  // fail
  if (!video) {
    return res.sendStatus(404);
  }
  // success: Update video's view
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

/* API - Create comment (댓글 생성) */
export const createComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req;
  const video = await Video.findById(id);
  const userDB = await User.findById(user._id);
  // Check existence
  if (!video || !userDB) {
    req.flash("error", "No video or user information.");
    res.sendStatus(404);
  }
  // Create comment
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  // Update video's comments
  video.comments.push(comment._id);
  await video.save();
  // Update user's comments
  userDB.comments.push(comment._id);
  await userDB.save();
  return res.status(201).json({ newCommentId: comment._id });
};

/* API - Delete comment (댓글 삭제) */
export const deleteComment = async (req, res) => {
  const { id } = req.params; // comment's id from template
  // Check owner
  const { _id } = req.session.user; // user's id from session
  const comment = await Comment.findById(id);
  console.log(comment, comment.owner, _id);
  if (!comment || !_id || String(comment.owner) !== String(_id)) {
    req.flash("error", "No permission.");
    return res.sendStatus(403);
  }
  // Success
  const videoId = String(comment.video._id);
  await Comment.findByIdAndDelete(id); // Delete comment
  const user = await User.findById(_id);
  user.videos.splice(user.videos.indexOf(id), 1);
  await user.save(); // Delete comment in user's comments list
  const video = await Video.findById(videoId);
  video.comments.splice(video.comments.indexOf(id), 1);
  await video.save(); // Delete comment in video's comments list
  return res.sendStatus(204);
};
