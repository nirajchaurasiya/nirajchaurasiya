import bcrypt from "bcryptjs";
import userSchema from "../../Model/UserModel";
import connectDB from "../../Middleware/connectDB";

const handler = async (req, res) => {
  const { email, entered_password } = req.body;
  console.log(email, entered_password);
  try {
    const isEmailExists = await userSchema.findOne({ email: email }).lean();

    if (isEmailExists) {
      if (isEmailExists.activate) {
        const actual_password = isEmailExists.password;
        // Compare entered password with the stored hashed password using bcrypt
        const isPasswordMatch = await bcrypt.compare(
          entered_password,
          actual_password
        );

        if (isPasswordMatch) {
          // Convert Mongoose instance to a plain JavaScript object
          const userData = isEmailExists;
          delete userData.email;
          delete userData.activate;
          delete userData.password;
          delete userData.activationToken;
          delete userData.createdAt;
          delete userData.updatedAt;
          res.send({ status: 1, msg: "Login success", data: userData });
        } else {
          res.send({ status: 0, msg: "Invalid Credentials" });
        }
      } else {
        res.send({ status: 2, msg: "Account is not activated" });
      }
    } else {
      res.send({ status: 0, msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error logining!", error);
    res.status(500).send({ status: -1, msg: "An error occurred!" });
  }
};

export default connectDB(handler);
