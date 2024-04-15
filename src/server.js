import express from "express";
import morgan from "morgan";
import session from "express-session";

import MongoStore from "connect-mongo";

import flash from "express-flash";

import root from "./routers/rootRouter.js"; //바보같이 파일 생성시 확장자 안써줘서 에러 뜸!
import user from "./routers/userRouter.js"; //그리고 import 할 때 자동완성이 됐는데, 뒤에 .js 붙여줘야 컴파일 에러 안 뜸
import video from "./routers/videoRouter.js";
import { localsMiddleware } from "./middlewares.js";
import apiRouter from "./routers/apiRouter.js";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); //views 의 경로를 설정
/*
Express는 html을 리턴하기 위해 pug 를 사용함
1. pug 설치 : npm i pug
2. pug를 뷰 엔진으로 설정 : app.set("view engin", "pug")
3. pug 파일 생성
*/

app.use(logger);
app.use(express.urlencoded({ extended: true }));
/*
app.use(express.urlencoded({ extended: true })) : 
express application이 form의 value를 이해할 수 있도록 하고,
자바스크립트 형식으로 변형해줌
*/

//라우터 전에 세션을 초기화함
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());

// app.use((req, res, next) => {
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   });
// });
app.use(localsMiddleware);

app.use("/upfile", express.static("upfile"));
app.use("/static", express.static("assets"));

app.use("/", root);
app.use("/videos", video);
app.use("/users", user);

app.use("/api", apiRouter);

/* chapter 3 에서 실습했던 내용
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  console.log(`Time : ${year}.${month}.${day}`);
  next();
};


const handleHome = (req, res) => {
  //console.log(req);
  //return res.end(); //서버가 리퀘스트를 끝냄.
  return res.send("I still love you."); //메시지를 보냄
};


const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  next();
};
const handleProtected = (req, res) => {
  return res.send("Welcome to the private Lounge");
};

app.use(loggerMiddleware);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);

app.get("/", handleHome);
*/

export default app;
