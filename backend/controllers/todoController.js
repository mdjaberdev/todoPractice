const Todo = require("../models/userModel");
const todoController = async (req, res) => {
  const { task, status, priority } = req.body;

  if (!task || !priority || !status) {
    return res.send({
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
  res.send({
    success: true,
    message: "Task add",
  });
};

const allTodosGetController = async (req, res) => {
  const data = await Todo.find({});
  res.send({
    success: true,
    message: "All Task ",
    data: data,
  });
};

const deleteTodosController = async (req, res) => {
  const { id } = req.params;
  const deleteTask = await Todo.findByIdAndDelete(id);
  res.send({
    success: true,
    message: "Todos Deleted",
  });
};
const updateTodosController = async (req, res) => {
  
  const { id } = req.params;
 let updateData = { ...req.body };
 if (req.file) {
   updateData.path = req.file.path;
 }
 const updateTask = await Todo.findByIdAndUpdate(id, updateData, { new: true });
  res.send({
    success: true,
    message: "Task Updated",

  });
};

module.exports = {
  todoController,
  allTodosGetController,
  deleteTodosController,
  updateTodosController,
};
