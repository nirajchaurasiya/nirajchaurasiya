import mongoose from "mongoose";
const CommentModel = mongoose.Schema(
  {
    name: String,
    cid: String,
    email: String,
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("commentdata", CommentModel);
