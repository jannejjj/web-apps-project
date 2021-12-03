var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Snippet = require("../models/Snippet")
const Comment = require("../models/Comment")

// Checks if an identical snippet exists and if not, saves the snippet to database and returns 200. Otherwise returns 403 Decided to not allow duplicates
router.post('/snippet/', function(req, res, next) {
    Snippet.findOne({snippet: req.body.snippet}, (err, snippet) => {
        if(err) return next(err);
        if(!snippet) {
            new Snippet({
                snippet: req.body.snippet,
                timestamp: req.body.timestamp,
                upvotes: req.body.upvotes,
                downvotes: req.body.downvotes
            }).save((err) => {
                if(err) return next(err);
                return res.status(200).send("Saved snippet to database.")
            });
        } else {
            return res.status(403).send("Duplicate snippets are not allowed!");
        }
    })
});

// Basically identical to the above, checks if an identical comment exists on the snippet and if not, saves the comment with the snippet's id and returns 200. Otherwise returns 403.
router.post('/comment/', function(req, res, next) {
    Comment.findOne({snippetid: req.body.snippetid, comment: req.body.comment},
    function(err, comment) {
        if(err) return next(err);
        if(!comment) {
            new Comment({
                comment: req.body.comment,
                timestamp: req.body.timestamp,
                upvotes: req.body.upvotes,
                downvotes: req.body.downvotes,
                snippetid: req.body.snippetid
            }).save((err) => {
                if(err) return next(err);
                return res.status(200).send("Saved comment to database.");
            });
        } else {
            return res.status(403).send("Duplicate comments are not allowed!")
        }
    })
});



module.exports = router;
