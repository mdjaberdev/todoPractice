const Todo = require("../models/userModel");
const deleteTodoController = async (req, res) => {
  const { id } = req.params;
  const deleteTask = await Todo.findByIdAndDelete(id);
  res.status(200).send({
    success: true,
    message: "Todos Deleted",
  });
};

module.exports = { deleteTodoController };
