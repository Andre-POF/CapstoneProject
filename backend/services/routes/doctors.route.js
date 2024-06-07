import { Router } from "express";
import Doctor from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../auth/index.js";

export const doctorRoute = Router();

doctorRoute.get("/doctors", async (req, res, next) => {
  const doctor = await Doctor.find();
  res.send(doctor);
  console.log("Doctors collection form DB");
});

doctorRoute.post("/doctors", async (req, res, next) => {
  try {
    let doctor = await Doctor.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.send(doctor).status(400);
  } catch (error) {
    next(error);
  }
});

// login
doctorRoute.post("/login", async (req, res, next) => {
  try {
    let userFound = await Doctor.findOne({
      username: req.body.username,
    });
    if (userFound) {
      const passwordMatches = bcrypt.compare(
        req.body.password,
        userFound.password
      );
      if (passwordMatches) {
        const accessToken = await generateJWT({
          username: userFound.username,
        });
        res.send({ userFound, accessToken });
        // res.redirect(
        //   `http://localhost:3000/home?accessToken=${accessToken}&id=${userFound._id}`
        // );
      } else {
        alert("Username and password don't match.");
        res.status(400).send("Wrong password");
      }
    } else {
      res.status(400).send("User not found!");
    }
  } catch (error) {
    next(error);
  }
});
