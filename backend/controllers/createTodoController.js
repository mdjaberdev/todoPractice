const Todo = require("../models/userModel");
const createTodoController = async (req, res) => {
  try {
    const { task, status, priority } = req.body;

    if (!task || !priority || !status) {
      return res.status(400).send({
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
    res.status(201).send({
      success: true,
      message: "Task add",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createTodoController,
};
