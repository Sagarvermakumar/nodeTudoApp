import express from "express";
import userRoute from "./Routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./Routes/task.js";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from 'cors'
const app = express();

//configuration
config({
  path: "./config/config.env",
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//routes
app.use("/user", userRoute);
app.use("/task", taskRouter);




// @error middleware
app.use(errorMiddleWare);

export default app;
