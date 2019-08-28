const   express     = require("express"), 
        app         = express(), 
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        passport    = require("passport"),
        LocalStrategy = require("passport-local"),
        Campground  = require("./models/campground"), //We don't need  the .js. That's implicit.
        Comment     = require("./models/comment"),
        User        = require("./models/user"),
        seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v5", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); //adds css, but doesn't link to it
app.set("view engine", "ejs");
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Blue wins cutest dog!"
}));

app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
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
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
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

// =======================
// COMMENTS ROUTES
// =======================
app.get("/campgrounds/:id/comments/new", (req, res) => {
    // find campground by id
    Campground.findById(req.params.id,  (err, campground) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
    //lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    // redirect to campground show page
});

app.listen(3000, () => {
    console.log("port 3000 server is now running!")
});
