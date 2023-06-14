let videos = [
  {
    title: "First Video",
    rating: 5,
    Comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    Comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    Comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

/* Homepage - global router */
export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

/* Watch Video */
export const watch = (req, res) => {
  // video id
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};

/* Edit Video (GET) */
export const getEdit = (req, res) => {
  // video id
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: #${video.title}`, video });
};

/* Edit Video (POST) */
export const postEdit = (req, res) => {
  // video id
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

/* Upload Video (GET) */
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

/* Upload Video (POST) */
export const postUpload = (req, res) => {
  // Upload to DB
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    Comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
