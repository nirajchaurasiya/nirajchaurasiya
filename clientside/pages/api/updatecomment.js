import CommentModel from "../../Model/CommentModel";
import connectDB from "../../Middleware/connectDB";

const handler = async (req, res) => {
  try {
    const { id, cid } = req.body;
    console.log(id, cid);
    if (id && cid) {
      const updatedComment = await CommentModel.findByIdAndUpdate(
        id,
        { cid },
        { new: true }
      );

      if (updatedComment) {
        res.status(200).json({ status: 1, data: updatedComment });
      } else {
        res.status(404).json({ status: 0, data: "Comment not found" });
      }
    } else {
      res
        .status(400)
        .json({ status: -1, data: "Id and updated comment must be provided" });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({
      status: -1,
      msg: "An error occurred while updating the comment",
    });
  }
};

export default connectDB(handler);
