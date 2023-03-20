const express = require('express');
const Book = require('../models/Book.model');
const router = express.Router();

// GET /books
router.get("/books", (req, res, next) => {

  Book.find()
    .then(booksArr => {

      const data = {
        books: booksArr
      };

      res.render("books/books-list", data);
    })
    .catch(e => {
      console.log("error getting books from DB", e);
      next(e);
    });
});



//GET /books/create
router.get("/books/create", (req, res, next) => {
  res.render("books/book-create");
});



//POST /books
router.post("/books", (req, res, next) => {
  
  const bookDetails = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating
  }

  Book.create(bookDetails)
    .then( bookFromDB => {
      res.redirect("/books");
    })
    .catch(e => {
      console.log("error creating new book", e);
      next(e);
    });

});



//GET /books/:bookId
router.get("/books/:bookId", (req, res, next) => {

  const {bookId} = req.params;

  Book.findById(bookId)
    .then( bookDetails => {
      res.render("books/book-details", bookDetails);
    })
    .catch(e => {
      console.log("error getting book details from DB", e);
      next(e);
    });

});







module.exports = router;
