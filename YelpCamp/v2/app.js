const   express     = require("express"), 
        app         = express(), 
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Kakariko Forest", 
//     img:"https://www.forest-trends.org/wp-content/uploads/2017/04/acadia_np_622419-High-Res-1500x1000.jpg",
//     desc: "A vast, mystical and breathtaking forest."
// }, (err, campground) => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//     }
// });

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
            res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //find the campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        }
        else {
            //render show template with specified campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log("port 3000 server is now running!")
});
