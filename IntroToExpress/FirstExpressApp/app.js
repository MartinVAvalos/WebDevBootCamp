var express = require("express"); 
var app = express();

// "/" => "Hi there!"
app.get("/", (req, res)=> {
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", (req, res)=> {
    res.send("Goodbye!");
});

// "/dog" => "MEOW!MMM"
app.get("/dog", (req, res) => {
    console.log("Someone made a request to dog");
    res.send("MEOW!");
});

app.get("/r/:subredditName", (req, res) => {
    var subredditName = req.params.subredditName;
    res.send("WELCOME THE " + subredditName.toUpperCase() + " SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title", (req, res) => {
    res.send("Welcome to a COMMENTS PAGE!");
});

// 404 page
app.get("*", (req, res) => {
    res.send("You are a star");
});

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});