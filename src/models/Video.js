import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  desription: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;
