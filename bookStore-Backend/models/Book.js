const mongoose = require("mongoose");
const BookSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  bookName: {
    type: String,
    required: true
  },
  bookCover: {
    type: String,
    required: true
  },
  rating: Number,
  language: String,
  pageNo: Number,
  author: {
    type: String,
    required: true
  },
  genre: Array,
  readed: String,
  description: String,
  backgroundColor: String,
  navTintColor: String,
}, { versionKey: false });
module.exports = mongoose.model("Book", BookSchema);
