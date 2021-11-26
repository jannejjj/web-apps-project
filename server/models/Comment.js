const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema({
    comment: String,
    timestamp: Date,
    upvotes: Number,
    downvotes: Number
});

module.exports = mongoose.model("Comment", commentSchema);