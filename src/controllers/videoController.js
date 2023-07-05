// DB Models
import User from "../models/User";
import Video from "../models/Video";

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
  const video = await Video.findById(id).populate("owner");
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
    return res.status(403).redirect("/");
  }
  // Success
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

/* Edit Video (POST) */
export const postEdit = async (req, res) => {
  // Check video from DB
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  // Check own user
  const {
    user: { _id },
  } = req.session;
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  // Update video to DB
  const { title, description, hashtags } = req.body;
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
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
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  // Save to DB
  try {
    const newVideo = await Video.create({
      fileUrl,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
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
  // Success
  await Video.findByIdAndDelete(id); // Delete video
  const user = User.findById(_id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save(); // Delete video in user's video list
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

/* API - Video's View */
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  // fail
  if (!video) {
    return res.sendStatus(404);
  }
  // success
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
