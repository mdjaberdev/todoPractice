const Todo = require("../models/userModel");
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Todo.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Todos Deleted",
    });
  } catch (error) {
   return res.status(500).json({
     success: false,
     message: "Internal Server Error",
     error: error.message,
   });
  }
};

module.exports = { deleteTodoController };
