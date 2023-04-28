const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
router.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    res.json(book);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", async (req, res) => {
  const book = new Book({
    id: req.body.id,
    bookName: req.body.bookName,
    bookCover: req.body.bookCover,
    rating: req.body.rating,
    language: req.body.language,
    pageNo: req.body.pageNo,
    author: req.body.author,
    genre: req.body.genre,
    readed: req.body.readed,
    description: req.body.description,
    backgroundColor: req.body.backgroundColor,
    navTintColor: req.body.navTintColor,
  });
  console.log(book);
  try {
    const savedBook = await book.save();
    res.json(savedBook);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.updateOne({
      $set: {
        id: req.body.id,
        bookName: req.body.bookName,
        bookCover: req.body.bookCover,
        rating: req.body.rating,
        language: req.body.language,
        pageNo: req.body.pageNo,
        author: req.body.author,
        genre: req.body.genre,
        readed: req.body.readed,
        description: req.body.description,
        backgroundColor: req.body.backgroundColor,
        navTintColor: req.body.navTintColor,
      },
    });
    console.log(updatedBook);
    res.json(updatedBook);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removedBook = await Book.deleteOne({ id: req.params.id });
    res.json(removedBook);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
