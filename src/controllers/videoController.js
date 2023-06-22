// DB Models
import Video from "../models/Video";

/* Homepage - root router */
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

/* Watch Video */
export const watch = async (req, res) => {
  // get video from DB
  const { id } = req.params;
  const video = await Video.findById(id);
  // return
  if (!video) return res.render("404", { pageTitle: "Video not found." });
  return res.render("watch", { pageTitle: video.title, video });
};

/* Edit Video (GET) */
export const getEdit = async (req, res) => {
  // get video from DB
  const { id } = req.params;
  const video = await Video.findById(id);
  // return
  if (!video) return res.render("404", { pageTitle: "Video not found." });
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

/* Edit Video (POST) */
export const postEdit = async (req, res) => {
  // Check video from DB
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  if (!video) return res.render("404", { pageTitle: "Video not found." });
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
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

/* Delete Video */
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
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
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
