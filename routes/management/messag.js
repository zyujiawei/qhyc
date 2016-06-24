var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'Households';
    locals.data = {
        posts: []
    };

var q = keystone.list('User').model.find().where('username',req.user.username).exec().then(function(result) {
    q = keystone.list('property_Area').model.find().where('property',result[0]._id);
    q.exec(function(err, results) {
        locals.data.posts=results;
        view.render('management/messag');
    });
},function(err){
    console.log(err);
});



};
