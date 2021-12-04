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

router.post('/snippet/delete/', function(req, res, next) {
    Snippet.findByIdAndRemove(req.body.id, function(err, snippet) {
        if (err) return next(err);
        if(!snippet) {
            return res.status(404).send("No snippet was found with the given id.");
        } else {
            Comment.deleteMany({snippetid: req.body.id}, function(err, result) {
                if (err) {
                    return next(err);
                } else {
                    return res.status(200).send("Removed snippet: " + snippet.snippet + " and " + result.deletedCount + " comments.");
                }
            })
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
