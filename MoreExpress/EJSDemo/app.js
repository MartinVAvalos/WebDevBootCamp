var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
}); 

app.get("/fallinlovewith/:thing", (req, res) => {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", (req,res) => {
    var posts = [
        {title: "Post1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Pamela"},
        {title: "Can you believe this pomsky", author: "Martin Vera"}
    ];

    
    res.render("posts", {posts: posts});
});

app.listen(3000, () =>{
    console.log("Server on port 3000");
});