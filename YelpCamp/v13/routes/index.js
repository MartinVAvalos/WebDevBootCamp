// All purpose routes that aren't related to a particular model

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//root route
router.get("/", (req, res) => {
    res.render("landing");
});

// show register form
router.get("/register", (req,res) => {
    res.render("register");
});

//handle sign up logic
router.post("/register", (req,res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => { //stored hashed password
        if(err) {
            console.log(err);
            // req.flash("error", err.message);
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, () => { //local strategy
            req.flash("success", "Welcome to YelpCamp" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", (req, res) => {
    res.render("login");
});

//handling login logic
// router.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), (req, res) => {}
);

//Logic Route
router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;