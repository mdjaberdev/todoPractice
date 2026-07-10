const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const fs = require('fs');
const path = require('path');

const createTodo = async (req, res) => {
  try {
    const { task, priority, status } = req.body;

    if (!task || task.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task is required'
      });
    }

    const image = req.file ? req.file.filename : '';
    const todo = await Todo.create({
      task,
      priority,
      status,
      image
    });

    const todoWithUrl = todo.toObject();
    todoWithUrl.image = todo.image ? `${req.protocol}://${req.get('host')}/uploads/${todo.image}` : '';

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todoWithUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const getTodos = async (req, res) => {
  try {
    let todos = await Todo.find().sort({ createdAt: -1 });
    todos = todos.map(todo => {
      const todoObj = todo.toObject();
      todoObj.image = todo.image ? `${req.protocol}://${req.get('host')}/uploads/${todo.image}` : '';
      return todoObj;
    });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Todo ID'
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const todoWithUrl = todo.toObject();
    todoWithUrl.image = todo.image ? `${req.protocol}://${req.get('host')}/uploads/${todo.image}` : '';

    res.status(200).json({
      success: true,
      data: todoWithUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, priority, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Todo ID'
      });
    }

    if (task && task.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task is required'
      });
    }

    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const updateData = { task, priority, status };
    
    if (req.file) {
      if (existingTodo.image) {
        const oldImagePath = path.join(__dirname, '../uploads', existingTodo.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.filename;
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    const todoWithUrl = todo.toObject();
    todoWithUrl.image = todo.image ? `${req.protocol}://${req.get('host')}/uploads/${todo.image}` : '';

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: todoWithUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Todo ID'
      });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    if (todo.image) {
      const imagePath = path.join(__dirname, '../uploads', todo.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
};
