import express from "express";
import config from "config";
import "./utils/dbConnect.js";
import userRouter from "./controllers/users/index.js";
import adminRouter from "./controllers/admins/index.js";
import blogRoter from "./controllers/blogs/index.js";

const app = express();
app.use(express.json());
const PORT = config.get("PORT");

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello world!ssss" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);
app.use("/api/blogs", blogRoter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
