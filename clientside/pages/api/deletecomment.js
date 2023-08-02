import CommentModel from "../../Model/CommentModel";
import connectDB from "../../Middleware/connectDB";

const handler = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id => " + id);
    console.log(req.body);

    if (id) {
      const isCommentExist = await CommentModel.findById(id);

      if (isCommentExist) {
        await CommentModel.findByIdAndDelete(id); // Use `id` here instead of `_id`
        res.send({ status: 1, data: "Comment deleted successfully" });
      } else {
        console.log("Comment doesn't exist");
        res.send({ status: 0, data: "Comment not found" });
      }
    } else {
      console.log("Id must exist");
      res.send({ status: -1, data: "Id must exist" });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send({
      status: -1,
      msg: "An error occurred while deleting the comment",
    });
  }
};

export default connectDB(handler);
