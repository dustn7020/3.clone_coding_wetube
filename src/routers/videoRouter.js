import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController.js";

const videoRouter = express.Router();

videoRouter.get("/upload", getUpload);
videoRouter.post("/upload", postUpload);

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);

videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;
