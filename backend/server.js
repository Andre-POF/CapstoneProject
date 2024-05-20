import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import { firstRoute } from "./services/routes/first.route.js";
//import googleStrategy from "./services/auth/passport.js";

config();
const PORT = process.env.PORT || "3001";
const app = express();
app.use(express.json());
app.use(cors());
// passport.use("google", googleStrategy);

app.use("/", firstRoute);

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
