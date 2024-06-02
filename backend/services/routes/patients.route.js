import { Router } from "express";
import Patient from "../models/patient.model.js";

export const patientRoute = Router();

patientRoute.get("/patients", async (req, res, next) => {
  const patient = await Patient.find();
  res.send(patient);
  console.log("patients collection from DB");
});

patientRoute.post("/patients", async (req, res, next) => {
  try {
    let patient = await Patient.create({
      ...req.body,
    });
    res.send(patient).status(400);
  } catch (error) {
    next(error);
  }
});

patientRoute.get("/patients/:_id", async (req, res, next) => {
  try {
    const patientId = req.params._id;
    let patient = await Patient.findById(patientId);
    res.send(patient);
  } catch (error) {
    next(error);
  }
});

patientRoute.delete("/patients/:_id", async (req, res, next) => {
  try {
    const patientId = req.params._id;
    let patient = await Patient.findByIdAndDelete(patientId);
    if (patient) {
      res.status(200).json({ alert: " Patient Deleted! " });
    } else {
      res.status(404).json({ alert: " Patient Not Found. " });
    }
  } catch (error) {
    next(error);
  }
});

// patientRoute.patch("/patient/:_id/report", multer, async (req, res, next) => {
//   try {
//     const patientId = req.params._id;
//     let updatedPatient = await Patient.findByIdAndUpdate(
//       patientId,
//       { report: req.file.path },
//       { new: true }
//     );
//     res.send(updatedPatient);
//   } catch (error) {
//     console.log(error);
//   }
// });
