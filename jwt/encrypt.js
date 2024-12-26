import jwt from "jsonwebtoken";
import config from "config";

function encryption() {
  try {
    let userData = {
      name: "Saad",
      age: 20,
      password: "456789",
    };
    let secretKey = config.get("SECRET_KEY");

    let token = jwt.sign(userData, secretKey, { expiresIn: "1h" });
    console.log(token);
  } catch (error) {
    console.log(error);
  }
}
encryption();
