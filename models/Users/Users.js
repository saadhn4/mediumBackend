import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  followers: {
    type: Number,
    required: true,
  },
  following: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  banner: {
    type: String,
    required: false,
  },
});

const userModel = mongoose.model("users", userSchema, "users");

export default userModel;
