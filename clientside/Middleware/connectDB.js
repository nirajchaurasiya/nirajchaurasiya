import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connection[0]) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.MONGO_URI);
  return handler(req, res);
};

export default connectDB;
