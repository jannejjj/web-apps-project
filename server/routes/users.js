var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var _require = require("express-validator"),
  body = _require.body,
  validationResult = _require.validationResult;

var passwordValidator = require("password-validator");
const User = require("../models/User");
const validateToken = require("../auth/validateToken");
const mongoose = require("mongoose");
const schema = new passwordValidator();

// prettier-ignore
schema
  .is().min(8, "Password needs to be at least 8 characters long.\n")
  .is().max(255, "Password too long!\n")
  .has().lowercase(
  1,
  "Password needs to contain at lowercase characters (at least one).\n"
)
  .has().uppercase(
  1,
  "Password needs to contain uppercase characters (at least one).\n"
)
  .has().digits(1, "Password needs to contain at least 1 number!\n")

// Registration - Validates email and password, checks if a user with the same email exists, hashes the password and adds a new user to the database.
router.post(
  "/register",
  body("email").isEmail().trim().escape(),
  (req, res, next) => {
    const emailErrors = validationResult(req);
    if (!emailErrors.isEmpty()) {
      return res.status(403).json({ error: "Email isn't a proper email." });
    }

    const passwordErrors = schema.validate(req.body.password, {
      details: true,
    });

    console.log(passwordErrors);
    if (passwordErrors != []) {
      return res.status(403).json({ passwordErrors: passwordErrors });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (user) {
        return res
          .status(403)
          .json({ error: "A user with the given email already exists!" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            new User({
              email: req.body.email,
              password: hash,
              votedComments: [],
              votedSnippets: [],
              isAdmin: false,
            }).save((err) => {
              if (err) return next(err);
              return res
                .status(200)
                .json({ message: "User registered successfully!" });
            });
          });
        });
      }
    });
  }
);

// Login - pretty basic. Checks if a user with the req.email exists and then compares passwords. If they match, a jwt is generated for the user. The jwt is then saved to local storage on client side (which is an unsafe practice but will suffice for the purposes of this project). This also means that logout is handled on client side instead of here.
router.post("/login", body("email").trim().escape(), (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(403).json({ error: "Invalid credentials" });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return res.status(403).json({ error: "Invalid credentials" });
        } else {
          const jwtPayload = {
            email: user.email,
            id: user._id,
          };
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 600, // 10 minutes shall suffice for this purpose
            },
            (err, token) => {
              console.log(token);
              res
                .status(200)
                .json({ message: "Logged in successfully!", token: token });
            }
          );
        }
      });
    }
  });
});

// Deleting a user. This could have been done using jwt more, but I felt like simply getting the email and password from req.body is enough. This option is only available for a logged in user.
router.post("/delete", body("email").trim().escape(), (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user exists with the given email" });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return res.status(403).json({ message: "Incorrect password!" });
        } else {
          User.deleteOne({ email: req.body.email }).catch(function (error) {
            console.log(error);
          });
          res.status(200).send("User deleted successfully");
        }
      });
    }
  });
});

router.post("/whoami", (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader == undefined || authHeader === null) {
    return res.status(401).json({ error: "You are not logged in!" });
  } else {
    token = authHeader.split(" ")[1];
  }
  jwt.verify(token, process.env.SECRET, (err, data) => {
    return res.status(401).json({ error: "You are not logged in!" });
  });
  let userid = data.id;

  User.findById(userid, function (err, user) {
    if (!user) {
      return res.status(404).json({ error: "No user was found with the ID" }); // this should never happen
    } else {
      return res.status(200).json({ userid: userid });
    }
  });
});

module.exports = router;
