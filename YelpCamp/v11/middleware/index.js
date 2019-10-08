// all the middleware goes here
var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// next() runs the next code, which would be the route handler, since it will be used as middleware
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err || !foundCampground) {  //!foundCampground checks if foundCampground is null, because bull is falsey
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else {
                // does user own campground?
                if(foundCampground.author.id.equals(req.user.id)) {
                    next();
                }
                else  {
                req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "You need to logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err || !foundComment) {
                req.flash("error", "Comment not found");
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
    else {
        req.flash("error", "You need to be logged in to do that");
        return res.redirect("/login");
    }
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
