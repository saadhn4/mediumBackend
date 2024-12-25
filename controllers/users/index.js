import express from "express";
import userModel from "../../models/Users/Users.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let userData = req.body;
    let hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;
    await userModel.create(userData);
    res.status(200).json({ msg: "User registered!! 💻👋" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let users = await userModel.find({});
    res.status(200).json({ all_users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getuser/:email", async (req, res) => {
  try {
    let userParams = req.params.email;
    let user = await userModel.find({ email: userParams });
    res.status(200).json({ User: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:email", async (req, res) => {
  try {
    let userParams = req.params.email;
    let userUpdate = req.body;
    await userModel.updateOne({ email: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "User info updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:email", async (req, res) => {
  try {
    let userParams = req.params.email;
    await userModel.deleteOne({ email: userParams });
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: "All users deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
