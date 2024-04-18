import bcrypt from "bcryptjs";
import { getAccessToken } from "../../method/jwtCreation.js";
import cookieConfig from "../../config/cookieConfig.js";
import User from "../../models/User.js";

export default async function SignInController(req, res) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials" });
    }

    const token = getAccessToken({ id: existingUser._id });
    res.cookie("accessToken", `Bearer ${token}`, cookieConfig);
    return res
      .status(200)
      .json({ success: true, message: "Logged In Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
