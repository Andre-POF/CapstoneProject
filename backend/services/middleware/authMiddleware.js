import Doctor from "../models/doctor.model.js";
import { verifyJWT } from "../auth/index.js";

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).send("Please login.");
    } else {
      const decoded = await verifyJWT(
        req.headers.authorization.replace("Bearer ", "")
      );
      if (decoded.exp) {
        delete decoded.iat;
        delete decoded.exp;
        const me = await Doctor.findOne({
          ...decoded,
        });
        console.log(me);
        if (me) {
          req.Doctor = me;
          next();
        } else {
          res.status(401).send("User not found");
        }
      } else {
        res.status(401).send("Login again please");
      }
    }
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
