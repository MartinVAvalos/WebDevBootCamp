var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//INDEX - show all campgrounds
router.get("/", (req, res) => {
    // Get all campgrounds from database
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("./campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - a new campground and save to database
router.post("/", (req, res) => {
    // Get data from form and add to campgrounds array
    const name = req.body.name;
    const img = req.body.img;
    const desc = req.body.desc;
    const newCampground = {name: name, img: img, desc: desc};
    // Create a new campground and save to database
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        }
        else {
            // Redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err) {
            console.log(err);
        }
        else {
            //render show template with specified campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;