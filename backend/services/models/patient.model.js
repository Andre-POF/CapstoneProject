import { model, Schema } from "mongoose";

const patient = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    family: {
      type: String,
      required: true,
    },
    family: {
      type: String,
      required: true,
    },
    reasonForConsultation: {
      type: String,
      required: true,
    },
    interventionType: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: false,
    },
  },
  {
    collection: "patients",
    timestamps: true,
  }
);

export default model("Patient", patient);
