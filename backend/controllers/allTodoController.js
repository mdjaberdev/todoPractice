
const Todo = require("../models/userModel");
const allTodoController = async (req, res) => {
  const data = await Todo.find({});
  res.status(200).send({
    success: true,
    message: "All Task ",
    data: data,
  });
};

module.exports = { allTodoController };