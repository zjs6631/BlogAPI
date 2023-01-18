const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {type: String, require: true},
    authorID: {type: Schema.Types.ObjectId, ref: "User"},
    postID: {type: Schema.Types.ObjectId, ref: "Posts"}
}, {timestamps: true}, //provides .createdAt and .updatedAt to message obj);
);

module.exports = mongoose.model("Comment", CommentSchema)