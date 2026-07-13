const mongoose = require("mongoose");
const dbConnection = () => {
  return mongoose
    .connect(
      "mongodb+srv://mdjaber:jhjaber2004@cluster1.gxwb1gq.mongodb.net/todoList?appName=Cluster1",
    )
    .then(() => {
      console.log("DataBase Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { dbConnection };
