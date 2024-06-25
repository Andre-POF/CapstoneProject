import { Router } from "express";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

export const patientRoute = Router();

patientRoute.get("/user/:doctorId", async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;
    const patients = await Patient.find({ doctor: doctorId }).populate(
      "doctor"
    );

    if (!patients || patients.length === 0) {
      return res.status(404).send("No patients found for this doctor");
    }

    res.send(patients);
    console.log("Patients collection fetched from DB");
  } catch (error) {
    next(error);
  }
});

patientRoute.post("/:id", async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }
    let patient = await Patient.create({
      ...req.body,
      doctor: doctor._id,
    });

    res.status(201).send(patient);
  } catch (error) {
    next(error);
  }
});

patientRoute.get("/:_id", async (req, res, next) => {
  try {
    const patientId = req.params._id;
    let patient = await Patient.findById(patientId);
    res.send(patient);
  } catch (error) {
    next(error);
  }
});

patientRoute.delete("/:_id", async (req, res, next) => {
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

patientRoute.put("/:_id", async (req, res, next) => {
  try {
    const patientId = req.params._id;
    let updatedPatient = await Patient.findByIdAndUpdate(patientId, req.body, {
      new: true,
    });
    if (!updatedPatient) {
      return res.status(404).send("Patient not found");
    }
    res.send(updatedPatient);
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
