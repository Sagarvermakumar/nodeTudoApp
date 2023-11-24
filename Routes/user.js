import express from "express";
import {
  getAllUsers,
  getMyProfile,
  login,
  logoutUser,
  register,
} from "../controllers/user.js";
import { isAuthenticate } from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.get("/all", getAllUsers);
userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/me", isAuthenticate, getMyProfile);
userRoute.get('/logout', logoutUser );

export default userRoute;
