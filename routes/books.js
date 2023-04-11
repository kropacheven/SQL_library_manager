const express = require('express');
const router = express.Router();

//Importing Book model from models folder:
const Book = require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
  }
  
/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("index", { books: books });
  }));

/* Create a new book form. */
router.get('/new', (req, res) => {
    //res.send('new');
    res.render("new-book", { title: "New Book" });
  });
  

/* POST create new book */
router.post('/', asyncHandler(async (req, res) => {
    let books;
    try {
    books= await Book.create(req.body);
    //console.log(req.body)
    res.redirect("/books/" + books.id);
    } catch (error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        books = await Book.build(req.body);
        res.render("new-book", { books, errors: error.errors, title: "New Book"  })
      } else {
        throw error; // error caught in the asyncHandler's catch block
      }  
    }
  }));
  

/* GET individual book. */
router.get("/:id", asyncHandler(async (req, res) => {
  const books = await Book.findByPk(req.params.id);
  if (books) {
    res.render("update-book", { books: books, title: "Update book" }); 
  } else {
    //res.sendStatus(404);
    res.render('error');
  }
}));

/* POST Update individual book. */
router.post('/:id', asyncHandler(async (req, res) => {
  let books;
  try {
    books = await Book.findByPk(req.params.id);
    if (books) {
      await books.update(req.body);
      res.redirect("/books/" + books.id);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      books = await Book.build(req.body);
      books.id = req.params.id; // make sure correct article gets updated
      res.render("update-book", { books, errors: error.errors, title: "Update Book" })
    } else {
      throw error;
    }
  }
}));

/* Delete article form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const books  = await Book.findByPk(req.params.id);
  if (books) {
    res.render("delete", { books: books, title: "Delete Book" });
  } else {
    res.sendStatus(404);
  }
}));


/* Delete individual article. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const books  = await Book.findByPk(req.params.id);
  if (books) {
    await books.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }

}));


module.exports = router;