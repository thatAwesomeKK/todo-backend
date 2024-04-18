import { Router } from "express";
import CreateTodoController from "../controller/todo/CreateTodoController.js";
import verifyAccessToken from "../middleware/verifyAccessToken.js";
import FetchTodoController from "../controller/todo/FetchTodoController.js";
import DeleteTodoController from "../controller/todo/DeleteTodoController.js";
import UpdateTodoController from "../controller/todo/UpdateTodoController.js";
const router = Router();

router.post("/create", verifyAccessToken, CreateTodoController);
router.get("/fetch", verifyAccessToken, FetchTodoController);
router.put("/update/:id", verifyAccessToken, UpdateTodoController);
router.delete("/delete/:id", verifyAccessToken, DeleteTodoController);

export default router;
