import Todo from "../../models/Todo.js";
import User from "../../models/User.js";

export default async function FetchTodoController(req, res) {
  try {
    const user = req.verify;
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found!" });
    }

    const todos = await Todo.find({ uid: user.id });
    if (!todos) {
      return res
        .status(400)
        .json({ success: false, message: "No Todo Found!" });
    }

    return res.status(200).json({ success: true, todos });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
