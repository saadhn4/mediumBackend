/*
title
Desc
Content
Conclusion
Likes
Banner-image
*/

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 40,
  },
  description: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1000,
  },
  conclusion: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: true,
  },
  bannerImage: {
    type: String,
    required: false,
  },
});

const blogModel = mongoose.model("blogs", blogSchema, "blogs");

export default blogModel;
