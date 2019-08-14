const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgrounds = [
    {name: "Salmon Creek", img:"https://www.photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732c7bd09345c450_960.jpg&user=chanwity"},
    {name: "Starry Mountains", img:"https://www.photosforclass.com/download/pixabay-1189929?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732c7bdc964cc659_960.jpg&user=Noel_Bauza"},
    {name: "Kakariko Forrest", img:"https://ithacatrails.org/trail-photos/raw/Old%20Growth%20IMG_0666.JPG"},
    {name: "Salmon Creek", img:"https://www.photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732c7bd09345c450_960.jpg&user=chanwity"},
    {name: "Starry Mountains", img:"https://www.photosforclass.com/download/pixabay-1189929?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732c7bdc964cc659_960.jpg&user=Noel_Bauza"},
    {name: "Kakariko Forrest", img:"https://ithacatrails.org/trail-photos/raw/Old%20Growth%20IMG_0666.JPG"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    // Get data from form and add to campgrounds array
    const name = req.body.name;
    const img = req.body.img;
    const newCampground = {name: name, img: img};
    campgrounds.push(newCampground);
    // Redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(3000, () => {
    console.log("port 3000 server is now running!")
});
