import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import ErrorHandler from "./error.js";

export const isAuthenticate = async (req, res, next) => {
  console.log("working 1");
  const { token } = req.cookies;
  console.log("working 2");
  if (!token) return next(new ErrorHandler("Login first...", 400));

  const decodeed = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeed._id);

  next();
};
