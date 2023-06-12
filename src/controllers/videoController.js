/* Homepage - global router */
export const home = (req, res) => res.render("home", { pageTitle: "Home" });

/* Search Video - global router */
export const search = (req, res) => res.send("Search Video 🔎");

/* Watch Video */
export const watch = (req, res) => res.render("watch", { pageTitle: "Watch" });

/* Upload Video */
export const upload = (req, res) => res.send("Upload Video");

/* Edit Video */
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });

/* Delete Video */
export const deleteVideo = (req, res) =>
  res.send(`Delete Video: #${req.params.id}`);
