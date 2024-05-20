import { Router } from "express";
import Test from "../models/test.model.js";

export const firstRoute = Router();

firstRoute.get("/test", async (req, res, next) => {
  const test = await Test.find();
  res.send(test);
  console.log("testing DB");
});

firstRoute.post("/test", async (req, res, next) => {
  try {
    let test = await Test.create({
      ...req.body,
    });
    res.send(test).status(400);
  } catch (error) {
    next(error);
  }
});
