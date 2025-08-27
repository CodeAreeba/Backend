const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "UserType" },
    },
  },
  { timestamps: true }
);
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      { userId: this._id, email: this.email, name: this.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.error("Token generation error:", error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
