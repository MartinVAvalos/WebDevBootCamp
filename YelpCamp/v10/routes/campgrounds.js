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
router.post("/", isLoggedIn, (req, res) => {
    // Get data from form and add to campgrounds array
    let name = req.body.name;
    let img = req.body.img;
    let desc = req.body.desc;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: name, img: img, desc: desc, author: author};
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
router.get("/new", isLoggedIn, (req, res) => {
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

// Edit Campground Route
router.get("/:id/edit", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.render("campgrounds/edit", {campground: foundCampground});   
        }
    });
});

// Update Campground Route
router.put("/:id", (req, res) => {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=> {
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
                                    //you could also use updatedCampground._id
        }
    });
    //redirect somewhere (show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;