import express from "express";
import passport from "passport";

export const googleUserRoute = express.Router();

googleUserRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route
googleUserRoute.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      const { profile, accessToken } = req.user;
      window.localStorage.setItem("profile", profile);
      res.redirect(
        `http://localhost:3000/home?accessToken=${req.user.accToken}`
      );
    } catch (error) {
      next(error);
    }
  }
);

googleUserRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleUserRoute.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      res.send(req.user);
      res.redirect(`http://localhost:3000/home?accToken=${req.user.accToken}`);
    } catch (error) {
      next(error);
    }
  }
);
