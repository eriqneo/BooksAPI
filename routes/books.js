const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getSingleBook,
  deleteBook,
  createBook,
  updateBook,
} = require("../controllers/books");

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);

module.exports = router;
