const Book = require("../models/Book");
const Message = require("../models/Message");
const Posts = require("../models/Posts");
const Shops = require("../models/Shops");
const User = require("../models/User");
const Comment = require('../models/Comment')

const async = require("async");

const bcrypt = require('bcryptjs');
var passport = require('passport');

const {body, validationResult} = require('express-validator');

exports.create_post = [
    body("title", "Post title required").trim().isLength({min: 1}).escape(),
    body("body", "Post body required").trim().isLength({min: 1}).escape(),
    body("author", "Post author required").trim().isLength({min: 1}).escape(), 

    (req, res, next) =>{
        
        const errors = validationResult(req);
        console.log(req.body)
        const post = new Posts({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author,
            category: req.body.category,
            books: req.body.books,
            img: req.body.img,
            comments: req.body.comments,
            published: req.body.published,
        });

        //if there are errors then we can send json with errors
        if(!errors.isEmpty()){
            res.json(errors.array());
            return;
        }

        post.save((err) =>{
            if(err){
                return next(err);
            }
            res.json(post)
        })


    },
]

exports.create_book = [
    body("title", "Book title required").trim().isLength({min: 1}).escape(),
    body("rating", "Book rating required").trim().isLength({min: 1}).escape(),
    body("author", "Book author required").trim().isLength({min: 1}).escape(), 

    (req, res, next) =>{
        
        const errors = validationResult(req);
        console.log(req.body)
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            review: req.body.review,
            genre: req.body.genre,
            img: req.body.img,
            dateCompleted: req.body.dateCompleted,
        });

        //if there are errors then we can send json with errors
        if(!errors.isEmpty()){
            res.json(errors.array());
            return;
        }

        book.save((err) =>{
            if(err){
                return next(err);
            }
            res.json(book)
        })


    },
]

exports.create_shop = [
    body("name", "Shop name required").trim().isLength({min: 1}).escape(),
    body("body", "Shop description required").trim().isLength({min: 1}).escape(),

    (req, res, next) =>{
        
        const errors = validationResult(req);
        console.log(req.body)
        const shop = new Shops({
            name: req.body.name,
            body: req.body.body,
            products: req.body.products,
            img: req.body.img,
        });

        //if there are errors then we can send json with errors
        if(!errors.isEmpty()){
            res.json(errors.array());
            return;
        }

        shop.save((err) =>{
            if(err){
                return next(err);
            }
            res.json(shop)
        })


    },
]

exports.create_user = [
    
    //sanitize and validate all of the inputs
    body("firstname", "first name required").trim().isLength({min: 1}).escape(),
    body("lastname", "last name required").trim().isLength({min: 1}).escape(),
    body("username", "username required").trim().isLength({min:1}).escape(),
    body("password", "password required").trim().isLength({min: 1}).escape(),
    body("confirmpassword", "passwords do not match").custom((val, {req}) => val ===req.body.password).escape(),
    
    
    (req, res, next) =>{

        const errors = validationResult(req); //returns an array of errors if any

        if(!errors.isEmpty()){
            res.json(errors.array());
            return;
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) =>{
            let isAdmin = false;
            if(req.body.isAdmin === process.env.adminpass){
                isAdmin = true;
            }
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
            }).save((err)=>{
                if(err){
                    return next(err);
                }
                
                res.json(user);
            });

        });
        
    },

]

