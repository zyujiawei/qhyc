var keystone = require('keystone');
	/*
	 *	定义一键开锁
	*/
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'unlock';
	locals.data = {
		posts: []
	};

	var property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
			q = keystone.list('Entertainment').model.find().populate('property').where('property',result[0]._id).sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			console.log(err);
		});

	});
	view.render('mobile/services/unlock');
};
