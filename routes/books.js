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
    res.render("newbook", { title: "New Book" });
  });
  

// /* POST create article. */
// router.post('/', asyncHandler(async (req, res) => {
//     await Book.create(req.body);
//     // console.log(req.body)
//     // res.redirect("/articles/" + book.id);
//   }));
  


  module.exports = router;