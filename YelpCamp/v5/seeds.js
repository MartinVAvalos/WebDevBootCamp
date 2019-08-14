const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment   = require("./models/comment");
 
var seeds = [
    {
        name: "Kakariko Forest", 
        img:"https://www.forest-trends.org/wp-content/uploads/2017/04/acadia_np_622419-High-Res-1500x1000.jpg",
        desc: "A vast, mystical and breathtaking forest."
    },
    {
        name: "Gerudo Valley", 
        img: "https://thefairytaletraveler.com/wp-content/uploads/2017/12/Game-of-Thrones-filming-locations-in-iceland-7.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Orange Coast", 
        img: "http://www.excelsior.com.mt/blog/wp-content/uploads/2013/10/malta-nature-.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];
 
async function seedDB(){
    try {
        await Campground.remove({});
        console.log("Campgrounds Removed");
        await Comment.remove({});
        console.log("Comments Removed");
        // line 24 and 25 will await one another to finish before they execute the next line
    
        for(const seed of seeds) {
            let campground = await Campground.create(seed);
            console.log("Campground Created");
            let comment = await Comment.create(
                {
                    text: "This place is great, but I wish there was internet",
                    author: "Homer"
                });
                console.log("Comment Created");
                campground.comments.push(comment);
                campground.save();
                console.log("Comment added to campground");
        }
    }
    catch(err)  {
        console.log(err);
    }
}
 
module.exports = seedDB;