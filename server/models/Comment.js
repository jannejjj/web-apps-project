const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema({
  userid: { type: String },
  snippetid: { type: String },
  comment: { type: String },
  timestamp: { type: String },
});

module.exports = mongoose.model("Comment", commentSchema);
