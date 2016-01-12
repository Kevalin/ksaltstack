/**
 * Created by lizi on 2016/1/11.
 */
var mongo = require('mongo');
var usersModel = mongo.userModel();

exports.index = function(req, res) {
    if (req.session && req.session.user) {
        usersModel.findOne({user: req.session.user.user}, function(err, user) {
            if (err) return console.log(err);
            if (!user) {
                req.session.reset();
                res.redirect('/')
            } else {
                res.locals.user = user;
                res.render('main')
            }
        })
    } else {
        res.redirect('/')
    }
};