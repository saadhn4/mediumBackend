import express from "express";
import adminModel from "../../models/Admins/Admins.js";
import bcrypt from "bcryptjs";

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    let adminData = req.body;
    let hash = await bcrypt.hash(adminData.password, 10);
    adminData.password = hash;
    await adminModel.create(adminData);
    res.status(200).json({ msg: "Admin registered!! 💻👋" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let admins = await adminModel.find({});
    res.status(200).json({ all_admins: admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getadmin/:email", async (req, res) => {
  try {
    let adminParams = req.params.email;
    let admin = await adminModel.find({ email: adminParams });
    res.status(200).json({ Admin: admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:email", async (req, res) => {
  try {
    let adminParams = req.params.email;
    let adminUpdate = req.body;
    console.log(adminUpdate);
    await adminModel.updateOne({ email: adminParams }, { $set: adminUpdate });
    res.status(200).json({ msg: "Admin info updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:email", async (req, res) => {
  try {
    let adminParams = req.params.email;
    await adminModel.deleteOne({ email: adminParams });
    res.status(200).json({ msg: "Admin deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await adminModel.deleteMany({});
    res.status(200).json({ msg: "All admins deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
