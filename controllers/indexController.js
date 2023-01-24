const Book = require("../models/Book");
const Message = require("../models/Message");
const Posts = require("../models/Posts");
const Shops = require("../models/Shops");
const User = require("../models/User");
const Comment = require('../models/Comment')


const async = require("async");
const jwt = require("jsonwebtoken");

exports.get_index = (req, res, next) =>{
    Posts.find({published: true})
        .sort({createdAt: -1})
        .limit(6)
        .exec(function (err, post_list){
            //handle error
            if(err){
                return next(err);
            }
            //successful, so send the result
            
            res.json(post_list);
         })
}

exports.get_books_read = (req, res, next) =>{
    Book.find()
        .sort({dateCompleted: 1})
        .populate('img')
        .exec(function(err, book_list){
            if(err){
                return next(err)
            }

            res.json(book_list);
        })
}

exports.get_book = (req, res, next) =>{
    Book.find(req.params.id)
        .exec(function(err, book){
            if(err){
                return next(err)
            }
            res.json(book)
        });
}

exports.get_books_read_2022 = (req, res, next) =>{
    Book.find()
        .sort({dateCompleted: {$gte: '2022-01-01', $lte: '2022-12-31'}})
        .populate('img')
        .exec(function(err, book_list){
            if(err){
                return next(err)
            }

            res.json(book_list);
        })
}

exports.get_books_read_2023 = (req, res, next) =>{
    Book.find()
        .sort({dateCompleted: {$gte: '2023-01-01', $lte: '2023-12-31'}})
        .populate('img')
        .exec(function(err, book_list){
            if(err){
                return next(err)
            }

            res.json(book_list);
        })
}

exports.get_post_list = (req, res, next) =>{
    Posts.find()
        .sort({timestamps: 1})
        .populate("comments")
        .populate("books")
        .populate("img")
        .populate("category")
        .exec(function(err, post_list){
            if(err){
                return next(err);
            }
            res.json(post_list);
        })
}

exports.get_post = (req, res, next) =>{
    
    async.parallel(
        {
            post(callback){
                Posts.findById(req.params.id).exec(callback);
            },
            comments(callback){
                Comment.find({postID: req.params.id}).populate('authorID').exec(callback);
            },
        },
        (err, results) =>{
            if(err){
                return next(err);
            }

            

            res.json(results);
        }
    )


    /*
    Posts.findById(req.params.id)
        .populate('comments')
        .exec(function(err, result){
            if(err){
                return next(err);
            }

            jwt.verify(req.token, 'secretkey', (err, auth_data) =>{
                if(err){
                    console.log(err)
                    res.json({
                        message: 'user not logged in',
                        result
                    })
                } else {
                    res.json({
                        message: 'user logged in',
                        auth_data,

                    })
                    return;
                }
            })

            
        })
        */
}

exports.get_shop_list = (req, res, next) =>{
    Shops.find()
        .sort({name: 1})
        .populate("img")
        .populate("products")
        .exec(function(err, shop_list){
            if(err){
                return next(err);
            }
            res.json(shop_list);
        })
}