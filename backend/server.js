import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import multer from "multer";
import authMiddleware from "./services/middleware/authMiddleware.js";
import { doctorRoute } from "./services/routes/doctors.route.js";
import { patientRoute } from "./services/routes/patients.route.js";
import { googleUserRoute } from "./services/routes/googleUser.route.js";
import googleStrategy from "./services/auth/passport.js";
import appointmentRouter from "./services/routes/appointments.route.js";

config();
const PORT = process.env.PORT || "3001";
const app = express();
app.use(express.json());
app.use(cors());

//Passport
passport.use("google", googleStrategy);
app.use(passport.initialize());

//Routes
app.use("/", doctorRoute);
app.use("/", authMiddleware, patientRoute);
app.use("/", googleUserRoute);
app.use("/appointments", appointmentRouter);

const intiServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to theraSync DB");

    app.listen(PORT, () => {
      console.log(`ascoltando dalla porta ${PORT}`);
    });
  } catch (error) {
    console.log("No connection to DB");
  }
};

intiServer();
