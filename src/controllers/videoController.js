// DB Models
import Video from "../models/Video";

/* Homepage - global router */
export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

/* Watch Video */
export const watch = (req, res) => {
  // video id
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching: ` });
};

/* Edit Video (GET) */
export const getEdit = (req, res) => {
  // video id
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing: ` });
};

/* Edit Video (POST) */
export const postEdit = (req, res) => {
  // video id
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

/* Upload Video (GET) */
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

/* Upload Video (POST) */
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  // Upload to DB
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags
        .split(",")
        .map((word) =>
          word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`
        ),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
