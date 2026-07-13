require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const express = require("express");
var cors = require("cors");
const app = express();
const multer = require("multer");
const storage = require("./utils/storage")

const { dbConnection } = require("./config/dataBaseConfig");
const { createTodoController } = require("./controllers/createTodoController");
const { allTodoController } = require("./controllers/allTodoController");
const { deleteTodoController } = require("./controllers/deleteTodoController");
const { updateTodoController } = require("./controllers/updateTodoController");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = "img" + "-" + Date.now();
//     cb(null, uniqueName + "-" + file.originalname);
//   },
// });

const upload = multer({ storage: storage });

dbConnection();
app.post("/createTodo", upload.single("image"), createTodoController);
app.get("/allTodo", allTodoController);
app.delete("/deleteTodo/:id", deleteTodoController);
app.post("/updateTodo/:id", upload.single("image"), updateTodoController);

app.listen(5000, () => {
  console.log("Server is Running 5000 port");
});
