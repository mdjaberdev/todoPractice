const express = require('express');
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/', upload.single('image'), createTodo);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.put('/:id', upload.single('image'), updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
