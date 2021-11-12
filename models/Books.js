const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: String,
  author: String,
  year_written: Number,
  edition: String,
  price: Number,
});

module.exports = mongoose.model("Books", booksSchema);
