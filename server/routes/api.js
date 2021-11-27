var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Snippet = require("../models/Snippet")

router.post('/snippet/', function(req, res, next) {
    // Checking if an identical snippet exists - could also not be checked but decided to not allow duplicates
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



module.exports = router;
