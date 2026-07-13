const Todo = require("../models/userModel");
const allTodoController = async (req, res) => {
  try {
    const data = await Todo.find({});
    return res.status(200).json({
      success: true,
      message: "All Task ",
      data: data,
    });
  } catch (error) {
    console.log(error);
   return res.status(500).json({
     success: false,
     message: "Internal Server Error",
     error: error.message,
   });
  }
};

module.exports = { allTodoController };
