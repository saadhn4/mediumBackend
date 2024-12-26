import jwt from "jsonwebtoken";
import config from "config";

function decryption() {
  try {
    let token = config.get("TOKEN");
    let secretKey = config.get("SECRET_KEY");
    let data = jwt.verify(token, secretKey);
    if (!data) {
      console.log("User not verified. Please login");
      return;
    }
    console.log("User Verified!!");
  } catch (error) {
    console.log(error);
  }
}
decryption();
