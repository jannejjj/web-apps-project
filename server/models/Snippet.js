const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let snippetSchema = new Schema({
    snippet: String,
    timestamp: String,
    upvotes: Number,
    downvotes: Number

});

module.exports = mongoose.model("Snippet", snippetSchema);