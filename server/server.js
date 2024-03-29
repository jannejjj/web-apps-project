require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoDB = "mongodb://localhost:27017/project-db";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.log.bind(console, "MongoDB connection error"));

var apiRouter = require("./routes/api");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/users", usersRouter);

module.exports = app;
