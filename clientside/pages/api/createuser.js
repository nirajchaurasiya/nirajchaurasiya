import userSchema from "../../Model/UserModel";
import connectDB from "../../Middleware/connectDB";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const handler = async (req, res) => {
  const { email } = req.body;
  try {
    const isEmailExists = await userSchema.findOne({ email: email });

    if (isEmailExists) {
      if (isEmailExists.activate) {
        return res.send({
          status: 0,
          msg: "User with email '" + isEmailExists.email + "' already exists",
        });
      } else {
        return res.send({
          status: 2,
        });
      }
    }

    // Generate a unique activation token
    const activationToken = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d", // Set the expiration time for the token
    });

    // Save the new user to the database with the activation token
    const newUser = await userSchema.create({
      ...req.body,
      activationToken,
      activate: false,
    });

    // Send the activation link to the user's email
    const activationLink = `${process.env.WEBSITE}/activate/${activationToken}`;
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL, // Replace with your sender email
      to: newUser.email,
      subject: "Account Activation",
      html: `
        <p>Dear ${newUser.name},</p>
        <p>Thank you for registering on our website. Please click the link below to activate your account:</p>
        <p><a href="${activationLink}">${activationLink}</a></p>
        <p>If you did not sign up for an account, you can ignore this email.</p>
      `,
    });

    res.send({ status: 1 });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send({ status: -1, msg: "An error occurred while creating the user" });
  }
};

export default connectDB(handler);
