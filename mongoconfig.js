require("dotenv").config(); //for environmental variables

//connect to the mongoDb database 

const mongoose = require("mongoose");
const mongoDb = process.env.mongoDb;
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

