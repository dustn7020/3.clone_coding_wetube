import express from "express";
import { join, login } from "../controllers/userController.js";
import { homeVideos, search } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", homeVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

/*
모든 파일은 모듈임 -> 파일 안에 있는 모든 건 다른 파일로부터 완전히 private 한 상태임
파일을 통째로 임포트하는 것는 아닌 라우터만 임포트해야 함. -> 라우터 변수만...
*/

export default globalRouter;
