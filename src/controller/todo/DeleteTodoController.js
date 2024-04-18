import Todo from "../../models/Todo.js";
import User from "../../models/User.js";

export default async function DeleteTodoController(req, res) {
  try {
    const user = req.verify;

    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found!" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id Required!" });
    }

    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res
        .status(400)
        .json({ success: false, message: "Todo Not Found!" });
    }

    await Todo.findOneAndDelete({ _id: id });

    return res
      .status(200)
      .json({ success: true, message: "Todo Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
