var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');


//import controller
const indexController = require("../controllers/indexController");
const postController = require('../controllers/postController');

/* GET home page. */
router.get('/', indexController.get_index);

router.get('/about-me/books', indexController.get_books_read );

router.get('/about-me/books/2022', indexController.get_books_read_2022);

router.get('/about-me/books/2023', indexController.get_books_read_2023);

router.get('/blog-posts', indexController.get_post_list);

router.get('/blog-posts/:id', verifyToken, indexController.get_post);

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
        //if it did authenticate then we sign the web token
        jwt.sign({user: req.user}, 'secretkey', (err, token)=>{
            if (err){
                return err;
            }
            res.json({
                token: token
            })
        });
      }
  );

  router.post('/blog-posts/:id', verifyToken, postController.create_comment);


//FORMAT OF JWT TOKENS
// Authorization: Bearer <access_token>


function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' '); //string to array, split by space

        //get token from array
        const bearerToken = bearer[1];

        //set token
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
}

module.exports = router;
