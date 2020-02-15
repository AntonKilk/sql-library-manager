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


// get / - Home route should redirect to the /books route.
// router.get('/', function(req, res, next) {
//   res.redirect("/books")
// });
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll( { order: [["createdAt", "DESC"]] });
  res.render("index", { books });
}));

// get /books - Shows the full list of books.

// get /books/new - Shows the create new book form.

// post /books/new - Posts a new book to the database.

// get /books/:id - Shows book detail form.

// post /books/:id - Updates book info in the database.

// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. 
// It can be helpful to create a new “test” book to test deleting.

module.exports = router;
