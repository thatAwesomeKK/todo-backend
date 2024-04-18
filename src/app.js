import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import todoRouter from "./routes/todo.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);

export default app;
