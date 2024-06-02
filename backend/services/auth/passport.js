import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import { generateJWT } from "./index.js";
import Doctor from "../models/doctor.model.js";
import passport from "passport";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { email, sub } = profile._json;
      let user = await Doctor.findOne({ email });
      if (user) {
        const accToken = await generateJWT({ _id: user._id });
        return done(null, { accToken });
      } else {
        const newUser = new Doctor({
          username: email,
          googleID: sub,
        });
        await newUser.save();
        const accToken = await generateJWT({ username: newUser.username });
        return done(null, { accToken });
      }
    } catch (error) {
      return done(error);
    }
  }
);

export default googleStrategy;
