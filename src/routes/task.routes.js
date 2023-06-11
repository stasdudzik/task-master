const express = require("express");
const {
  createTask,
  editTask,
  getAllTasks,
  getTaskById,
} = require("@controllers/task.controller");
const { validateTask, authorize } = require("../middlewares/middlewares");

const router = express.Router();

// Create a new task
router.post(`/tasks`, authorize, validateTask.create, createTask);

// Edit an existing task
router.put(`/tasks/:id`, authorize, validateTask.edit, editTask);

// Get all tasks
router.get(`/tasks`, authorize, getAllTasks);

// Get a single task by ID
router.get(`/tasks/:id`, authorize, getTaskById);

module.exports = router;
