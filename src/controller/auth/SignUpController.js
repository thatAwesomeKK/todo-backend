import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export default async function SignUpController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: secPass });
    await newUser.save();

    return res.status(201).json({ success: true, message: "User created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
