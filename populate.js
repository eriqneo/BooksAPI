require("dotenv").config();

const connectDB = require("./db/connectDB");
const jsonBooks = require("./jsonBooks.json");
const Books = require("./models/Books");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Books.deleteMany();
    await Books.create(jsonBooks);
    console.log("Success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
