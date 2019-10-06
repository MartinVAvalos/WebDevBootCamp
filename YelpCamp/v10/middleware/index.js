// all the middleware goes here
var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// next() runs the next code, which would be the route handler, since it will be used as middleware
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                res.redirect("back");
            }
            else {
                // does user own campground?
                if(foundCampground.author.id.equals(req.user.id)) {
                    next();
                }
                else  {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect("back");
            }
            else {
                // does user own comment?
                if(foundComment.author.id.equals(req.user.id)) {
                    next();
                }
                else  {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = (req, res, next) =>  {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;

// Another solution

// var middlewareObj = {
//     checkCampgroundOwnership: function() {

//     }
// };

// or

// module.exports = {
//     checkCampgroundOwnership
// }
