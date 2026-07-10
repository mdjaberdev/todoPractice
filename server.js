require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"])

require('dotenv').config();


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/todos', todoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
