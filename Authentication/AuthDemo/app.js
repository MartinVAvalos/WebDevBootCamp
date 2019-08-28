var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           =   require("passport-local"),
    passportLocalMongoose   =   ("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Blue is the best dog in the world", //This line will be used to encode
    // and decode sessions. Data will be stored inside session using line above to
    // encode it.
    resave: false,  //required
    saveUninitialized: false    //required
}));
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

// 24 and 25 are methods imported from passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Above two lines are responsible for reading the session
//  deserialize - taking data from session thats encoded and unencoding it
//  serialize - encoding data and putting data back into session

// ==============
//     ROUTES
// ==============


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});

// Auth Routes
app.get("/register", (req, res) => {
    res.render("register");
});
// Handling user sign-up
app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
//render login form
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {

});

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("login");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {  //isAuthenticated comes with passport
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => {
    console.log("Port 3000 server is now up and runnin!");
})