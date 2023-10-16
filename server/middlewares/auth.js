import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware function to authenticate user token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - Returns the next middleware function or error response.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; //reject bearer word

    //verify the token.
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      try {
        if (err) {
          return res.status(401).json({ error: "Unathorized!" });
        }

        //find user
        try {
          const user = await User.findOne({ _id: payload._id }).select(
            "-password"
          ); //remove password
          //attaching the user to the req.user
          req.user = user;
          next();
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};

export default authenticateToken;
