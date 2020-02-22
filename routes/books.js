var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

// GET /books - Shows the full list of books.
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll( { order: [["id", "DESC"]] });
  res.render("books", { books, title: "Books" });
}));


// GET /books/new - Create new book 
router.get('/new', (req, res) => {
  res.render("books/new-book", { title: "New Book" });
});

// POST /books/new - Post new book to the database.
router.post('/', asyncHandler(async (req, res) => {
  await Book.create(req.body);
  res.redirect("/books");
}));

// GET /books/:id - Shows book detail form.
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  if(book) {
  res.render("books/update-book", { book, title: book.title });
  } else {
    res.sendStatus(404);
  } 
}));

// post /books/:id - Updates book info in the database.
router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
  await book.update(req.body);
  res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
}));

// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. 
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
  await book.destroy();
  res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;
