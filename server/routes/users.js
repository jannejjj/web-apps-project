var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

const User = require('../models/User');
const validateToken = require('../auth/validateToken')
const mongoose = require("mongoose");


// Registration - Validates email and password, checks if a user with the same email exists, hashes the password and adds a new user to the database.
router.post('/register',
    body("email").isEmail().trim().escape(),
    body("password").isLength({ min: 8}),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(403).json({error: "Email or password doesn't meet requirements."});
        }
        User.findOne({email: req.body.email}, (err, user) => {
            if(err) throw err;
            if(user) {
                return res.status(403).json({error: "A user with the given email already exists!"});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if(err) throw err;
                        new User({
                            email: req.body.email,
                            password: hash,
                            hasVoted: false,
                            isAdmin: false
                        }).save((err) => {
                            if(err) return next(err);
                            return res.status(200).send("User registered successfully.")
                        })
                    })
                })
            }
        })
    }
);

// Login - pretty basic. Checks if a user with the req.email exists and then compares passwords. If they match, a jwt is generated for the user
router.post('/login',
    body('email').trim().escape(),
    (req, res, next) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if(err) throw err;
            if(!user) {
                return res.status(403).json({message: "Invalid credentials"});
            } else {
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if (!isMatch) {
                        return res.status(403).json({message: "Invalid credentials"})
                    } else {
                        const jwtPayload = {

                            email: user.email,
                        }
                        jwt.sign(
                            jwtPayload,
                            process.env.SECRET,
                            {
                                expiresIn: 180
                            },
                            (err, token) => {
                                res.status(200).json({token: token});
                            }
                        );
                    }
                })
            }
        })
    }
)

module.exports = router;