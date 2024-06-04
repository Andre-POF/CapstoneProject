import { Router } from "express";
import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";

const appointmentRouter = Router();

// Route to get all appointments by doctor
appointmentRouter.get("/doctor/:doctorId", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const appointments = await Appointment.find({ doctor: doctorId }).populate(
      "doctor patient"
    );
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Single appointment

appointmentRouter.get(
  "/appointmentDetails/:appointmentId",
  async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
      const appointmentDetails = await Appointment.findById(
        appointmentId
      ).populate("doctor patient");
      res.json(appointmentDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Appointments by Patient
appointmentRouter.get("/patient/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const appointments = await Appointment.find({
      patient: patientId,
    }).populate("doctor patient");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new appointment
appointmentRouter.post("/:doctorId/patient/:patientId", async (req, res) => {
  const { doctorId, patientId } = req.params;

  if (!doctorId || !patientId) {
    return res
      .status(400)
      .json({ message: "doctorId and patientId are required" });
  }

  try {
    // Check if doctor and patient exist
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create and save the appointment
    const appointment = new Appointment({ ...req.body });
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an existing appointment
appointmentRouter.put("/edit/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete an appointment
appointmentRouter.delete("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default appointmentRouter;
