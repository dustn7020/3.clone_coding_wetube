import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController.js";
import { homeVideos, search } from "../controllers/videoController.js";

const rootRouter = express.Router();

rootRouter.get("/", homeVideos);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

/*
모든 파일은 모듈임 -> 파일 안에 있는 모든 건 다른 파일로부터 완전히 private 한 상태임
파일을 통째로 임포트하는 것는 아닌 라우터만 임포트해야 함. -> 라우터 변수만...
*/

export default rootRouter;
