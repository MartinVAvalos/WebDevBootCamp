const   mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});

const Post = require("./models/post");
const User = require("./models/user");

// Post.create({
//     title: "How to create the best burger pt. 4",
//     content: "It's time!" 
// }, (err, post) => {
//     User.findOne({email: "bobe@gmail.com"}, (err, foundUser) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             foundUser.posts.push(post);
//             foundUser.save((err, data) => {
//                 if(err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });


// User.create({
//     email: "bobe@gmail.com",
//     name: "Bob Escobedo"
// });

// Find user
// Find all posts of that user

// User.findOne({email: "bobe@gmail.com"}).populate("posts").exec((err, user) => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });