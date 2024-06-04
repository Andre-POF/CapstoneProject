import { model, Schema } from "mongoose";

const appointment = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: false,
    },
    intervention: {
      type: String,
      required: false,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
  },
  {
    collection: "Appointments",
    timestamps: true,
  }
);

export default model("Appointment", appointment);
