import CommentModel from "../../Model/CommentModel";
import connectDB from "../../Middleware/connectDB";

const handler = async (req, res) => {
  try {
    const allcomment = await CommentModel.find();
    res.send({ status: 1, data: allcomment });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send({ status: -1, msg: "An error occurred while creating the user" });
  }
};

export default connectDB(handler);
