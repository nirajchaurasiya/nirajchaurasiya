import userSchema from "../../Model/UserModel";
import connectDB from "../../Middleware/connectDB";

const handler = async (req, res) => {
  const { _id } = req.body;
  try {
    const isUserExist = await userSchema.findById(_id);

    if (isUserExist) {
      res.send({ status: 1, data: isUserExist.name });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send({ status: -1, msg: "An error occurred while creating the user" });
  }
};

export default connectDB(handler);
