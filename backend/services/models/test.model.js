import { Schema, model } from "mongoose";

const test = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "test",
    timestamps: true,
  }
);

export default model("Test", test);
