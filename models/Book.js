const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {type: String, require: true},
    author: {type: String, require: true},
    rating: {type: String},
    review: {type: String},
    genre: {type: String},
    dateCompleted: {type: Date},
    img: [{type: String}],
});

module.exports = mongoose.model("Book", BookSchema);