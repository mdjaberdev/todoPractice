require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const createTodoController = require("../backend/controllers/createTodoController");
const allTodoController = require("../backend/controllers/allTodoController");
const deleteTodoController = require("../backend/controllers/deleteTodoController");
const updateTodoController = require("../backend/controllers/updateTodoController");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = "img" + "-" + Date.now();
    cb(null, uniqueName + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://mdjaber:jhjaber2004@cluster1.gxwb1gq.mongodb.net/todoList?appName=Cluster1",
  )
  .then(() => {
    console.log("DataBase Connected");
  });

app.post("/todo", upload.single("image"), createTodoController);
app.get("/allTodosGet", allTodoController);
app.delete("/deleteTodos/:id", deleteTodoController);
app.post("/updateTask/:id", upload.single("image"), updateTodoController);

app.listen(5000, () => {
  console.log("Server is Running 5000 port");
});
