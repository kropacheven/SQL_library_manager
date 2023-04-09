const express = require('express');
const router = express.Router();



/* GET books listing. */
router.get('/', (req, res) => {
  res.redirect("/books");
});


module.exports = router;
