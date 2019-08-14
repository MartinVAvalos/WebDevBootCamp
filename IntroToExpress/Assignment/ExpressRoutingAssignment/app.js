// Express Routing Assignment

// 1. Create a brand new Express app from scratch
// 2. Create a package.json using 'npm init' and express as a dependency
// 3. In your main app.js file,  add 3 different routes

var express = require("express");
var app = express();

app.get("/", (req, res) => {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", (req, res) => {
    var animal = req.params.animal;
    var speak = "";
    switch(animal) {
        case "pig":
          speak = "'Oink'";
          break;
        case "cow":
            speak = "'Moo'";
          break;
        case "dog":
                speak = "'Woof Woof!'";
            break;
        default:
          res.send("Oops");
    }
    res.send("The " + animal + " says " + speak);
});

app.get("/repeat/:word/:num", (req, res) => {
    var word = req.params.word;
    var num = req.params.num;
    var phrase = "";
    for (let i = 0; i < num; i++) {
        phrase += word + " ";
    }
    phrase = phrase.substring(0, phrase.length - 1);
    res.send(phrase);
});

app.get("*", (req, res) => {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});