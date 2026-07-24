const express = require("express");
const multer = require("multer");
const { createTodoController } = require("../controllers/createTodoController");
const { allTodoController } = require("../controllers/allTodoController");
const { deleteTodoController } = require("../controllers/deleteTodoController");
const { updateTodoController } = require("../controllers/updateTodoController");
const storage = require("../utils/storage");
const router = express.Router();
const upload = multer({ storage: storage });

router.post("/createTodo", upload.single("image"), createTodoController);
router.get("/allTodo", allTodoController);
router.delete("/deleteTodo/:id", deleteTodoController);
router.post("/updateTodo/:id", upload.single("image"), updateTodoController);

module.exports = router;
