import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connection[0]) {
    return handler(req, res);
  }
  console.log("Mongo " + process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);
  return handler(req, res);
};

export default connectDB;
