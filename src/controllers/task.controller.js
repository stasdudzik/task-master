const pool = require("@models/models");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, startDate, deadline } = req.body;
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, startDate, deadline) VALUES (?, ?, ?, ?)",
      [title, description, startDate, deadline]
    );
    const taskId = result.insertId;
    res.json({ taskId, message: "Task created successfully." });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task." });
  }
};

// Edit an existing task
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, deadline } = req.body;
    let updateFields = [];
    let queryParams = [];

    if (title) {
      updateFields.push("title = ?");
      queryParams.push(title);
    }
    if (description) {
      updateFields.push("description = ?");
      queryParams.push(description);
    }
    if (startDate) {
      updateFields.push("startDate = ?");
      queryParams.push(startDate);
    }
    if (deadline) {
      updateFields.push("deadline = ?");
      queryParams.push(deadline);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    const updateQuery = `UPDATE tasks SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    queryParams.push(id);

    await pool.query(updateQuery, queryParams);

    res.json({ message: "Task updated successfully." });
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ error: "Failed to edit task." });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Failed to get tasks." });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Task not found." });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error getting task:", error);
    res.status(500).json({ error: "Failed to get task." });
  }
};

module.exports = {
  createTask,
  editTask,
  getAllTasks,
  getTaskById,
};
