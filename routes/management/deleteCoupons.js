var keystone = require('keystone');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.data = {
        posts: []
    };
    locals.user = req.user;
    view.on('init', function(next) {
        var q = keystone.list('Store').model.find();
        q.exec(function(err, results) {
        if(results==""){
        }else{
            locals.data.posts = results;
            next(err);}
        },function(err){
        console.log(err);
        });
    });
    
view.render('management/deleteCoupons');
};
