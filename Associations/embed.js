const   mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true});

// POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const POST = mongoose.model("POST", postSchema);

// USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const USER = mongoose.model("USER", userSchema);

// let newUser = new USER({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });
// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Just go to potions class to learn it!"
// })
// newUser.save((err, save) => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(save);
//     }
// });

// let newUser = new USER({
//     email: "charlie@brown.edu",
//     name: "Charlie Brown"
// });
// newUser.save((err, user) => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });

// let newPost = new POST({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });
// newPost.save((err, post)=> {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(post);
//     }
// });

USER.findOne({name: "Hermione Granger"}, (err, user) => {
    if(err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "Three things I really hate",
            content: "1.Voldemort 2.Voldemort 3.Voldemort"
        });
        user.save((err, user) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        });
    }
});