var express = require('express');
var router = express.Router();
var passport = require('passport');


//import controller
const indexController = require("../controllers/indexController");
const postController = require('../controllers/postController');

/* GET home page. */
router.get('/', indexController.get_index);

router.get('/about-me/books', indexController.get_books_read );

router.get('/about-me/books/2022', indexController.get_books_read_2022);

router.get('/about-me/books/2023', indexController.get_books_read_2023);

router.get('/blog-posts', indexController.get_post_list);

router.get('/blog-posts/:id', indexController.get_post);

router.get('/shops', indexController.get_shop_list);

router.post('/blog-posts/new-post', postController.create_post);

router.post('/about-me/books/new-book', postController.create_book);

router.post('/shops/new-shop', postController.create_shop);

router.post('/new-user', postController.create_user);

router.post("/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureMessage: "Something went wrong"
    }
    ),
    function(req, res){
        res.json(req.user)
      }
  );

module.exports = router;
