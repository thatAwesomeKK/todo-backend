import Todo from "../../models/Todo.js";
import User from "../../models/User.js";

export default async function UpdateTodoController(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const user = req.verify;
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found!" });
    }

    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
      return res
        .status(400)
        .json({ success: false, message: "Todo Not Found!" });
    }

    let newTodo = {};

    if (title) newTodo.title = title;
    if (description) newTodo.description = description;

    await Todo.findByIdAndUpdate(id, newTodo);

    return res
      .status(200)
      .json({ success: true, message: "Todo Updated Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
