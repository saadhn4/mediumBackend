/*
title
Desc
Content
Conclusion
Likes
Banner-image
*/
import express from "express";
import blogModel from "../../models/Blogs/Blogs.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    let blogData = req.body;
    await blogModel.create(blogData);
    res.status(200).json({ msg: "Blog created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let blogs = await blogModel.find({});
    res.status(200).json({ all_blogs: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getblog/:id", async (req, res) => {
  try {
    let blogParams = req.params.id;
    let blog = await blogModel.find({ _id: blogParams });
    res.status(200).json({ Blog: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userUpdate = req.body;
    await blogModel.updateOne({ _id: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "Blog info updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await blogModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Blog deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await blogModel.deleteMany({});
    res.status(200).json({ msg: "All blogs deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
