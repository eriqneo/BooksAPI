const Books = require("../models/Books");

const getAllBooks = async (req, res) => {
  const books = await Books.find({});
  res.status(200).json({ books });
};

const getSingleBook = async (req, res) => {
  const { id: bookID } = req.params;
  const book = await Books.findOne({ _id: bookID });

  if (!book) {
    res.status(404).json({ msg: `No book with ID ${bookID}` });
  } else {
    res.status(200).json({ book });
  }
};

const deleteBook = async (req, res) => {
  const { id: bookID } = req.params;
  const book = await Books.findByIdAndDelete({ _id: bookID });

  if (!book) {
    res.status(404).json({ msg: `No Book with ID ${bookID}` });
  } else {
    res.status(202).json({ book });
  }
};

const createBook = async (req, res) => {
  const book = await Books.create(req.body);
  res.status(200).json({ book });
};

const updateBook = async (req, res) => {
  const { id: bookID } = req.params;
  const book = await Books.updateOne({ _id: bookID }, req.body, {
    new: true,
  });

  if (!book) {
    res.status(404).json({ msg: `No Book with ID ${bookID}` });
  }
  res.status(200).json({ book });
};

/* const getRandomBook = async (req, res) => {
  const count = await Books.countDocuments();
  const random = Math.floor(Math.random() * count);
  const br = await Books.findOne().skip(random);

  res.json(br); 
}; */

module.exports = {
  getAllBooks,
  getSingleBook,
  deleteBook,
  createBook,
  updateBook,
};
