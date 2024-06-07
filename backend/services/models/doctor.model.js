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
    name: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  {
    collection: "Doctors",
    timestamps: true,
  }
);

export default model("Doctor", doctor);
