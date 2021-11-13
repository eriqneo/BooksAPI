const Books = require("../models/Books");

const getAllBooks = async (req, res) => {
  const { title, field, sort, numericFilters } = req.query;
  const queryObject = {};

  //find by title; find by any letters in the title
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  //find by range; less than,equal etc only on Numbered variable on books i.e price & year_written
  if (numericFilters) {
    const operationMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operationMap[match]}-`
    );
    const options = ["price", "year_written"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Books.find(queryObject);
  //find chosen fields e.g price field or author field or both
  if (field) {
    const fieldList = field.split(",").join("");
    result = result.select(fieldList);
  }
  //sort by name, author etc in ascending or descending Order(add - before  variable e.g -title)
  if (sort) {
    const sortList = sort.split(",").join("");
    result = result.sort(sortList);
  } else {
    result = result.sort("edition");
  }

  const books = await result;
  res.status(200).json({ books, nbHits: books.length });
};

//get a Single book with id
const getSingleBook = async (req, res) => {
  const { id: bookID } = req.params;
  const book = await Books.findOne({ _id: bookID });

  if (!book) {
    res.status(404).json({ msg: `No book with ID ${bookID}` });
  } else {
    res.status(200).json({ book });
  }
};

//delete a book searching with ID
const deleteBook = async (req, res) => {
  const { id: bookID } = req.params;
  const book = await Books.findByIdAndDelete({ _id: bookID });

  if (!book) {
    res.status(404).json({ msg: `No Book with ID ${bookID}` });
  } else {
    res.status(202).json({ book });
  }
};

//Create a New book in the Library
const createBook = async (req, res) => {
  const book = await Books.create(req.body);
  res.status(200).json({ book });
};

//Change details of A book in the Library
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
