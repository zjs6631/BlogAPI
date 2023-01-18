var express = require('express');
var router = express.Router();

//import controller
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.get_index);

router.get('/about-me/books', indexController.get_books_read );

router.get('/about-me/books/2022', indexController.get_books_read_2022);

router.get('/about-me/books/2023', indexController.get_books_read_2023);

router.get('/blog-posts', indexController.get_post_list);

router.get('/blog-posts/:id', indexController.get_post);

router.get('/shops', indexController.get_shop_list);


module.exports = router;
