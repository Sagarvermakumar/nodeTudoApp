import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

// @find All users
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.find({});

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

// @logedin user
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email) return next(new ErrorHandler("Input all fields", 400));
  let user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Incorrect email or password", 200));

  const isMatchUser = await bcrypt.compare(password, user.password);
  if (!isMatchUser) return next(new ErrorHandler("Incorrect email or password", 200));
  sendCookie(res, user, `welcome back, ${user.name}`, 200);
});

// @registered user
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new ErrorHandler("Input all fields", 200));
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already exist", 200));
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendCookie(res, user, "User Registered Successfully", 201);
});

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
