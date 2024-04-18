import { Schema, model } from "mongoose";

export const todoSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("todo", todoSchema);
