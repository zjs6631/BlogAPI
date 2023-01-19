const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    name: {type: String, require: true},
    body: {type: String, require: true},
    products: [{type: String}],
    img: [{type: String}],
    }, {timestamps: true},  
);

ShopSchema.virtual('url').get(function(){
    return `/shops/${this._id}`
})

module.exports = mongoose.model("Shop", ShopSchema);