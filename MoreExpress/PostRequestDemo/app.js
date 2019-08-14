var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/addfriend", (req, res) => {
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends});
});

app.listen(3000, () => {
    console.log("Now listening to port 3000");
});