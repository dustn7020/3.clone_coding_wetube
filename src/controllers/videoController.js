import Video from "../models/Video.js";

export const homeVideos = async (req, res) => {
  const vidoes = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos: vidoes });
};

export const watch = async (req, res) => {
  const id = req.params.id;
  //const {id} =req.params;

  const video = await Video.findById(id);

  return res.render("watch", {
    pageTitle: `watching : ${video.title}`,
    video,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upolad video" });
};

export const postUpload = async (req, res) => {
  const { title, desription, hashtags } = req.body;
  try {
    await Video.create({
      title,
      desription,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => res.send("delete video");
