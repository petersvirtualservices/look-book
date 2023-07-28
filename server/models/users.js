const mongoose = require("mongoose");
// Create Schema
const userSchema = new mongoose.Schema(
  {
    userId: String,
    myPic: String,
   picture: {
    type:  String,
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
    name: {
      type: String,
    },
    email: {
      type: String
    },
    resetToken:String,
    expireToken:Date,

    hashedPassword: {
      type: String,
    },
    facebookId: {
      type: String
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    verified: { type: Boolean, default: false },

    bio: {
      type: String,
    },
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    uploads: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Upload",
      },
    ],
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PostMessage",
      },
    ],
  
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.PASSPORTSECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
