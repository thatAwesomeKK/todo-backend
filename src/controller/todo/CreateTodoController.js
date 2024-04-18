import Todo from "../../models/Todo.js";
import User from "../../models/User.js";

export default async function CreateTodoController(req, res) {
  try {
    const user = req.verify;
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found!" });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Title and Description Required!" });
    }

    const newTodo = new Todo({
      uid: user.id,
      title,
      description,
    });
    await newTodo.save();

    return res
      .status(201)
      .json({ success: true, message: "Todo Created Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
