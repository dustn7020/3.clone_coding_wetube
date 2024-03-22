import mongoose from "mongoose";
import Video from "./models/Video.js";

mongoose.connect("mongodb://localhost:27017/wetube");

const db = mongoose.connection;

const handleOpen = () => console.log("✔️  Connected to DB!");
const handleError = (error) => console.log("✖️  DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
