import express from "express";
import morgan from "morgan";

import global from "./routers/globalRouter.js"; //바보같이 파일 생성시 확장자 안써줘서 에러 뜸!
import user from "./routers/userRouter.js"; //그리고 import 할 때 자동완성이 됐는데, 뒤에 .js 붙여줘야 컴파일 에러 안 뜸
import video from "./routers/videoRouter.js";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

app.use("/", global);
app.use("/videos", video);
app.use("/users", user);

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

const handleListening = () =>
  console.log(`Server listenting on port http://localhost:${PORT} :)`);

app.listen(PORT, handleListening);
