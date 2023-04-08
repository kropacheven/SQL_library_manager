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
  //res.render("articles/index", { articles: {}, title: "Sequelize-It!" });
  res.render('index')
}));


module.exports = router;
