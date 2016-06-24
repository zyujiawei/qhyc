var keystone = require('keystone');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'mobile';
	locals.data = {
		posts: []
	};
	var property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
			q = keystone.list('Lostandfound').model.find().where('property',result[0]._id).sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			console.log(err);
		});
	});
	view.render('mobile/services/shopping');
};