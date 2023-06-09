/* Homepage - global router */
export const home = (req, res) => res.send("Home 💒");

/* Search Video - global router */
export const search = (req, res) => res.send("Search Video 🔎");

/* Watch Video */
export const watch = (req, res) =>
  res.send(`Watch Video: #${req.params.id} 🎥`);

/* Upload Video */
export const upload = (req, res) => res.send("Upload Video");

/* Edit Video */
export const edit = (req, res) => res.send(`Edit Video: #${req.params.id} 🎬`);

/* Delete Video */
export const deleteVideo = (req, res) =>
  res.send(`Delete Video: #${req.params.id}`);
