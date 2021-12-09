const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  votedSnippets: [{ type: String }],
  votedComments: [{ type: String }],
  isAdmin: { type: Boolean },
});

module.exports = mongoose.model("Users", userSchema);
