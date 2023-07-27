import userSchema from "../../Model/UserModel";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = decodedToken;
    // Find the user with the given email and activation token
    const user = await userSchema.findOne({ email, activationToken: token });

    if (!user) {
      return res.send({ status: 0, msg: "Invalid activation token" });
    }

    if (user.activate) {
      return res.send({ status: 2, msg: "Account already activated" });
    }

    // Update the user's activation status to true
    user.activate = true;
    await user.save();

    res.send({ status: 1, msg: "Account activated successfully!" });
  } catch (error) {
    console.error("Error activating account:", error);
    res.status(500).send({
      status: -1,
      msg: "An error occurred while activating the account",
    });
  }
};

export default handler;
