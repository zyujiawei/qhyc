var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'complaint';
	locals.data = {
		posts: []
	};
	var openid=req.query.openid;
	var property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('Complaint').model.find().where('openid',openid);
            q.exec(function(err, results) {
            locals.data.posts=results;  
            next(err);             
            },function(err){
			console.log(err);
			});
	});
	view.render('mobile/services/user_complaints');
};
