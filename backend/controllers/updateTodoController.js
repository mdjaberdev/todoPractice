
const Todo = require("../models/userModel");
const updateTodoController = async (req, res) => {
  const { id } = req.params;
  const updateTask = await Todo.findByIdAndUpdate({ _id: id }, req.body);
  res.status(200).send({
    success: true,
    message: "Task Updated",
  });
};

module.exports = { updateTodoController };
