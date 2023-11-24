import express from "express";
import {
  deleteTask,
  getAllTasks,
  getMyTask,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticate } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticate, newTask);
taskRouter.post("/my", isAuthenticate, getMyTask);
taskRouter
  .route("/:id")
  .put(isAuthenticate, updateTask)
  .delete(isAuthenticate, deleteTask);

  taskRouter.get('/allTasks', getAllTasks )

export default taskRouter;
