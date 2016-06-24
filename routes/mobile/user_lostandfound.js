var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'lostandfound';
	locals.data = {
		posts: []
	};
	var openid=req.query.openid;
	var property = req.params.property;
	var q = keystone.list('Lostandfound').model.find().where('openid',openid);
        q.exec(function(err, results) {
        locals.data.posts=results;
        var q1 = keystone.list('TemporaryState').model.find().where('type','失物招领').where('openid',openid).remove(function(err) {
		    // post已删除
		    });
		view.render('mobile/services/user_lostandfound');     
        },function(err){
		console.log(err);
		});
};
