const Book = require("../models/Book");
const Message = require("../models/Message");
const Posts = require("../models/Posts");
const Shops = require("../models/Shops");
const User = require("../models/User");

const async = require("async");

exports.get_index = (req, res, next) =>{
    Posts.find({published: true})
        .sort({timestamps: 1})
        .limit(6)
        .exec(function (err, post_list){
            //handle error
            if(err){
                return next(err);
            }
            //successful, so send the result
            console.log(post_list)
            res.json(post_list);
         })
}

exports.get_books_read = (req, res, next) =>{
    Book.find()
        .sort({dateCompleted: 1})
        .exec(function(err, book_list){
            if(err){
                return next(err)
            }

            res.json(book_list);
        })
}

exports.get_books_read_2022 = (req, res, next) =>{
    Book.find()
        .sort({dateCompleted: {$gte: '2022-01-01', $lte: '2022-12-31'}})
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
        .exec(function(err, post_list){
            if(err){
                return next(err);
            }
            res.json(post_list);
        })
}

exports.get_post = (req, res, next) =>{
    Posts.findById(req.params.id)
        .exec(function(err, result){
            if(err){
                return next(err);
            }

            res.json(result);
        })
}

exports.get_shop_list = (req, res, next) =>{
    Shops.find()
        .sort({name: 1})
        .exec(function(err, shop_list){
            if(err){
                return next(err);
            }
            res.json(shop_list);
        })
}