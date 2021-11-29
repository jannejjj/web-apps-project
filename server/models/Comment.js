const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema({
    postID: {type: String},
    comment: {type: String},
    timestamp: {type: String},
    upvotes: {type: Number},
    downvotes: {type: Number}
});

module.exports = mongoose.model("Comment", commentSchema);