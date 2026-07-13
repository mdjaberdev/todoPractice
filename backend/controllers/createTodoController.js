const Todo = require("../models/userModel");
const createTodoController = async (req, res) => {
  try {
    const { task, status, priority } = req.body;
    if (!task || !priority || !status) {
      return res.status(400).json({
        success: false,
        message: "Please Fil the all fields",
      });
    }

    const newTodo = new Todo({
      task: task,
      priority: priority,
      status: status,
      path: req.file.path,
    });
    await newTodo.save();
    return res.status(201).json({
      success: true,
      message: "Task add",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createTodoController,
};
