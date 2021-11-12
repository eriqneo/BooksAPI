require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connectDB");
const bookRoutes = require("./routes/books");

const notFoundMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Book Store</h1><a href=/api/v1/books>Books Route </a>");
});

app.use("/api/v1/books", bookRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server Running at ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
