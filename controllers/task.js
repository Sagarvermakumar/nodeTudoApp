import Task from "../Models/task.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const newTask = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title && !description)
    return next(new ErrorHandler("Input all Fields", 404));
  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task Added successfully",
  });
});

//  @get my task
export const getMyTask = catchAsyncError(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    tasks,
  });
});

// @get all tasks
export const getAllTasks = catchAsyncError(async (req, res, next) => {
  const task = await Task.find({});

  if (!task) return next(new ErrorHandler("Not task yet...", 404));

  res.status(200).json({
    success: true,
    task,
  });
});

// @update task
export const updateTask = catchAsyncError(async (req, res, next) => {
  const task = await Task.findById({_id:req.params.id});
  if (!task) return next(new ErrorHandler("Invalid Id", 404));

  task.isCompleted = !task.isCompleted;
  task.save();

  res.status(200).json({
    success: true,
    message: "task Updated",
  });
});

// @delete task
export const deleteTask = catchAsyncError(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new ErrorHandler("Task not found", 404));
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "task deleted",
  });
});
