import mongoose, { mongo } from "mongoose";
import config from "config";

async function connect() {
  try {
    let dbUrl = config.get("DB_URL");
    await mongoose.connect(dbUrl);
    console.log("DB CONNECTED");
  } catch (error) {
    console.log(error);
  }
}
connect();
