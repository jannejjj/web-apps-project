var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Snippet = require("../models/Snippet");
const Comment = require("../models/Comment");
const validateToken = require("../auth/validateToken");

// ********** SNIPPETS ********** //

// Checks if an identical snippet exists and if not, saves the snippet to database.
router.post("/snippet/", validateToken, function (req, res, next) {
  Snippet.findOne({ snippet: req.body.snippet }, (err, snippet) => {
    if (err) return next(err);
    if (!snippet) {
      new Snippet({
        userid: req.body.userid,
        title: req.body.title,
        snippet: req.body.snippet,
        timestamp: req.body.timestamp,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
      }).save((err) => {
        if (err) return next(err);
        return res.status(200).json({ message: "Saved snippet to database." });
      });
    } else {
      return res
        .status(403)
        .json({ error: "Duplicate snippets are not allowed!" });
    }
  });
});

// Simply finds all snippets and returns them as a list of JSON objects. This is used for getting the snippets into the feed in front-end
router.get("/snippets/", async function (req, res, next) {
  const snippets = await Snippet.find({}).catch((err) =>
    res.send({ error: err })
  );
  res.json(snippets);
});

// Gets a specific snippet by id, returns the snippet as JSON
router.get("/snippet/:id", function (req, res, next) {
  const { id } = req.params;
  Snippet.findById(id, (err, snippet) => {
    if (err) return next(err);
    if (!snippet) {
      res.status(404).json({ error: "No snippet found with the given id!" });
    } else {
      res.json(snippet);
    }
  });
});

router.post("/snippet/edit/", validateToken, function (req, res, next) {
  Snippet.findByIdAndUpdate(
    req.body.id,
    { snippet: req.body.comment },
    function (err, snippet) {
      if (err) return next(err);
      return res.status(200).json({ message: "Updated snippet" + snippet._id });
    }
  );
});

// Finds snippet by req.body.id and removes it. Then removes all comments whose snippetid = req.body.id. Only available through API, not the UI.
router.post("/snippet/delete/", validateToken, function (req, res, next) {
  Snippet.findByIdAndRemove(req.body.id, function (err, snippet) {
    if (err) return next(err);
    if (!snippet) {
      return res
        .status(404)
        .json({ error: "No snippet was found with the given id." });
    } else {
      Comment.deleteMany({ snippetid: req.body.id }, function (err, result) {
        if (err) {
          return next(err);
        } else {
          return res.status(200).json({
            message:
              "Removed snippet: " +
              snippet.snippet +
              " and " +
              result.deletedCount +
              " comments.",
          });
        }
      });
    }
  });
});

// Basically identical to POSTing a snippet. Checks if an identical comment exists and if not, creates one and saves it to db.
router.post("/comment/", validateToken, function (req, res, next) {
  Comment.findOne(
    { snippetid: req.body.snippetid, comment: req.body.comment },
    function (err, comment) {
      if (err) return next(err);
      if (!comment) {
        new Comment({
          userid: req.body.userid,
          comment: req.body.comment,
          timestamp: req.body.timestamp,
          upvotes: req.body.upvotes,
          downvotes: req.body.downvotes,
          snippetid: req.body.snippetid,
        }).save((err) => {
          if (err) return next(err);
          return res
            .status(200)
            .json({ message: "Saved comment to database." });
        });
      } else {
        return res
          .status(403)
          .json({ error: "Duplicate comments are not allowed!" });
      }
    }
  );
});

router.post("/comment/edit", validateToken, function (req, res, next) {
  console.log(req);
  Comment.findByIdAndUpdate(
    { _id: req.body.id },
    { comment: req.body.comment },
    function (err, comment) {
      if (err) return next(err);
      console.log(comment);
      return res.status(200).json({ message: "Updated comment" + comment._id });
    }
  );
});

// Simply finds all comments with the speficied snippet id and returns them. A catch is added for errors. This is used for getting the comments into the snippet page.
router.get("/comments/:id", async function (req, res, next) {
  const { id } = req.params;
  const comments = await Comment.find({ snippetid: id }).catch((err) =>
    res.send({ error: err })
  );
  console.log(comments);
  res.json(comments);
});

module.exports = router;
