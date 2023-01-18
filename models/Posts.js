const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true},
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    img: [{type: String}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    published: {type: Boolean},
    },
    {timestamps: true},
);

//added virtual to link to this specific post
PostSchema.virtual('url').get(function(){
    return `/blog-posts/${this._id}`
})

module.exports = mongoose.model("Post", PostSchema);