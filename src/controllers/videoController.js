let videos = [
  {
    title: "Hello",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Secods",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "ahahahaha",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 3,
  },
];

export const homeVideos = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const id = req.params.id;
  //const {id} =req.params;

  const video = videos[id - 1];
  return res.render("watch", {
    pageTitle: `watching : ${video.title}`,
    video: video,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const video = videos[id - 1];
  video.title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upolad video" });
};

export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "2 minutes ago",
    views: 0,
    id: videos.length + 1,
  };

  videos.push(newVideo);

  return res.redirect("/");
};

export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => res.send("delete video");
