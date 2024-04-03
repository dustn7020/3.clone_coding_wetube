import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
  search,
} from "../controllers/videoController.js";
import { protectorMiddelware, videoUpload } from "../middlewares.js";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(protectorMiddelware)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddelware)
  .get(getEdit)
  .post(postEdit);

videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddelware)
  .get(deleteVideo);

videoRouter.get("search", search);

export default videoRouter;
