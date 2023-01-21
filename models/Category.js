const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, require: true},
}, {timestamps: true}, //provides .createdAt and .updatedAt to message obj);
);

module.exports = mongoose.model("Comment", CategorySchema)