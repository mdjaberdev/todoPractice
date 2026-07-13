const Todo = require("../models/userModel");
const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTask = await Todo.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
   return res.status(500).json({
     success: false,
     message: "Internal Server Error",
     error: error.message,
   });
  }
};

module.exports = { updateTodoController };
