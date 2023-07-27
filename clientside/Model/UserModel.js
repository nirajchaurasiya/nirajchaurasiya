import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    activate: Boolean,
    activationToken: String,
  },
  { timestamps: true }
);

mongoose.models = {};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

export default mongoose.model("userdata", userSchema);
