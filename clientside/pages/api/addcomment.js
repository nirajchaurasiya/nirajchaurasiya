import CommentModel from "../../Model/CommentModel";
import connectDB from "../../Middleware/connectDB";

const handler = async (req, res) => {
  const { name, cid, email } = req.body;
  try {
    const newUser = await CommentModel.create({
      name: name,
      cid: cid,
      email: email,
    });
    await newUser.save();
    res.send({ status: 1 });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send({ status: -1, msg: "An error occurred while creating the user" });
  }
};

export default connectDB(handler);
