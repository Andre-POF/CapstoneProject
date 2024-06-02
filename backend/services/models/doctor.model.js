import { model, Schema } from "mongoose";

const doctor = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },
  {
    collection: "Doctors",
    timestamps: true,
  }
);

export default model("Doctor", doctor);
