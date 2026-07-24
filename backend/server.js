require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const express = require("express");
const cors = require("cors");
const app = express();
const storage = require("./utils/storage");
const todoRouter = require("./router/todoRouter");
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

dbConnection();
app.use("/api/v1/todo", todoRouter);

app.listen(5000, () => {
  console.log("Server is Running 5000 port");
});
