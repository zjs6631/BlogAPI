const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {type: String, require: true},
    authorName: {type: String},
    authorEmail: {type: String},
}, {timestamps: true}, //provides .createdAt and .updatedAt to message obj);
);

module.exports = mongoose.model("Message", MessageSchema);