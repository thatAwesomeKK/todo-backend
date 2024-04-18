import User from "../../models/User.js";

export default async function SignOutController(req, res) {
  try {
    const user = req.verify;
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    res.clearCookie("accessToken");
    return res
      .status(200)
      .json({ success: true, message: "Sign Out Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
