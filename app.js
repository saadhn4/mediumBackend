import express from "express";
import config from "config";
import "./utils/dbConnect.js";
import userRouter from "./controllers/users/index.js";
import adminRouter from "./controllers/admins/index.js";
import blogRouter from "./controllers/blogs/index.js";
import publicRouter from "./controllers/public/index.js";

const app = express();
app.use(express.json());
const PORT = config.get("PORT");

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello world!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/public", publicRouter);
app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);
app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
