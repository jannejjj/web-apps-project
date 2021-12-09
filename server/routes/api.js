var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Snippet = require("../models/Snippet");
const Comment = require("../models/Comment");

// ********** SNIPPETS ********** //

// Checks if an identical snippet exists and if not, saves the snippet to database and returns 200. Otherwise returns 403.
router.post("/snippet/", function (req, res, next) {
  Snippet.findOne({ snippet: req.body.snippet }, (err, snippet) => {
    if (err) return next(err);
    if (!snippet) {
      new Snippet({
        title: req.body.title,
        snippet: req.body.snippet,
        timestamp: req.body.timestamp,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
      }).save((err) => {
        if (err) return next(err);
        return res.status(200).send("Saved snippet to database.");
      });
    } else {
      return res.status(403).send("Duplicate snippets are not allowed!");
    }
  });
});

// Simply finds all snippets and returns them. A catch is added for errors. This is used for getting the snippets into the "feed"
router.get("/snippets/", async function (req, res, next) {
  const snippets = await Snippet.find({}).catch((err) =>
    res.send({ error: err })
  );
  res.json(snippets);
});

router.get("/snippet/:id", function (req, res, next) {
  const { id } = req.params;
  Snippet.findById(id, (err, snippet) => {
    if (err) return next(err);
    if (!snippet) {
      res.status(404).send("No snippet found with the given id!");
    } else {
      res.json(snippet);
    }
  });
});

/* NOT USED ATM
// Either increments or decrements the downvote value by 1, depending on the flag-argument
router.post('/snippet/downvote/:flag', function(req, res, next) {
    const {flag} = req.params;
    let value = 1;
    if (flag == "decrement") value = -1;
    Snippet.findByIdAndUpdate(req.body.id,
        {
            $inc: {
                downvotes: value
            }
        })
}) */

// Finds snippet by req.body.id and removes it. Then removes all comments whose snippetid = req.body.id
router.post("/snippet/delete/", function (req, res, next) {
  Snippet.findByIdAndRemove(req.body.id, function (err, snippet) {
    if (err) return next(err);
    if (!snippet) {
      return res.status(404).send("No snippet was found with the given id.");
    } else {
      Comment.deleteMany({ snippetid: req.body.id }, function (err, result) {
        if (err) {
          return next(err);
        } else {
          return res
            .status(200)
            .send(
              "Removed snippet: " +
                snippet.snippet +
                " and " +
                result.deletedCount +
                " comments."
            );
        }
      });
    }
  });
});

// ********* COMMENTS ********** //

// Basically identical to POSTing a snippet. Checks if an identical comment exists and if not, creates one and saves it to db
router.post("/comment/", function (req, res, next) {
  Comment.findOne(
    { snippetid: req.body.snippetid, comment: req.body.comment },
    function (err, comment) {
      if (err) return next(err);
      if (!comment) {
        new Comment({
          comment: req.body.comment,
          timestamp: req.body.timestamp,
          upvotes: req.body.upvotes,
          downvotes: req.body.downvotes,
          snippetid: req.body.snippetid,
        }).save((err) => {
          if (err) return next(err);
          return res.status(200).send("Saved comment to database.");
        });
      } else {
        return res.status(403).send("Duplicate comments are not allowed!");
      }
    }
  );
});

// Simply finds all comments with the speficied snippetid and returns them. A catch is added for errors. This is used for getting the comments into the snippet page.
router.get("/comments/:id", async function (req, res, next) {
  const { id } = req.params;
  const comments = await Comment.find({ snippetid: id }).catch((err) =>
    res.send({ error: err })
  );
  console.log(comments);
  res.json(comments);
});

module.exports = router;
