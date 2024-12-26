import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import userModel from "../../models/Users/Users.js";
import adminModel from "../../models/Admins/Admins.js";
import blogModel from "../../models/Blogs/Blogs.js";

const router = express.Router();

//user register api
router.post("/register", async (req, res) => {
  try {
    let userData = req.body;

    //validating for same email (to check if already registered)

    let userEmail = userData.email;
    let checkDuplicate = await userModel.findOne({ email: userEmail });

    console.log(checkDuplicate); //using findOne we are storing the entire object, not just the email ; if its a user that doesnt exist - it will show me null in terminal

    if (checkDuplicate) {
      return res.status(400).json({ msg: "User is already registered!!! ❌" });
    }

    //hashing the password
    let hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;

    //doing jwt part
    let secretKey = config.get("SECRET_KEY");

    let sendToken = jwt.sign({ checkDuplicate }, secretKey, {
      expiresIn: "1d",
    });

    await userModel.create(userData);
    res.status(200).json({ msg: "User registered!! 💻👋", token: sendToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

//login api for user

router.post("/login", async (req, res) => {
  try {
    let userData = req.body;
    let userEmail = userData.email;
    let userPass = userData.password;
    let checkUser = await userModel.findOne({
      email: userEmail,
    });
    if (!checkUser) {
      return res.status(400).json({ msg: "Email does not exist!" });
    }
    console.log(checkUser);

    let hashPass = checkUser.password; //this stores the hashed password
    let checkPass = await bcrypt.compare(userPass, hashPass);

    console.log(checkPass); //debug line

    if (checkPass) {
      res.status(200).json({ msg: "You are logged in!" });
    } else {
      res.status(400).json({ msg: "Incorrect password." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
