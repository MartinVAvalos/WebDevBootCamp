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

        //requiring routes
        var campgroundsRoutes = require("./routes/campgrounds"),
            commentRoutes = require("./routes/comments"),
            indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost:27017/yelp_camp_v8", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); //adds css, but doesn't link to it
app.set("view engine", "ejs");
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Blue wins cutest dog!",
    resave: false,
    saveUninitialized: false //Lines resave and saveUninitialized are options we have to add
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //method comes from file user.js under the line where passportLocalMongoose is plugged in
passport.serializeUser(User.serializeUser()); //method from passportLocalMongoose as well
passport.deserializeUser(User.deserializeUser()); //same with this method

//whatever function given in line bellow will be called on every route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes); //doesn't need the '/', but you can
                          // if you want to follow the pattern

app.listen(3000, () => {
    console.log("port 3000 server is now running!");
});
