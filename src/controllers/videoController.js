import Video from "../models/Video.js";
import User from "../models/User.js";

export const homeVideos = async (req, res) => {
  const vidoes = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos: vidoes });
};

export const watch = async (req, res) => {
  const id = req.params.id;
  //const {id} =req.params;

  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res
      .status(404)
      .render("errors/404", { pageTitle: "Video not found" });
  }
  return res.render("videos/watch", {
    pageTitle: `watching : ${video.title}`,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);

  if (!video) {
    return res
      .status(404)
      .render("errors/404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  return res.render("videos/edit", {
    pageTitle: `Editing : ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, desription, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  const {
    user: { _id },
  } = req.session;

  if (!video) {
    return res
      .status(404)
      .render("errors/404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    desription,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "upolad video" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    files: { video, thumb },
    body: { title, desription, hashtags },
  } = req;

  try {
    const newVideo = await Video.create({
      title,
      desription,
      hashtags: Video.formatHashtags(hashtags),
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
      owner: _id,
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    req.flash("success", "Video Success");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(404)
      .render("errors/404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];

  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    })
      .sort({ createdAt: "desc" })
      .populate("owner");
  }
  return res.render("videos/search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
