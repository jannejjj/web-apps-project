const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let snippetSchema = new Schema({
    _id: {type: String},
    snippet: {type: String},
    timestamp: {type: String},
    upvotes: {type: Number},
    downvotes: {type: Number}

});

module.exports = mongoose.model("Snippet", snippetSchema);