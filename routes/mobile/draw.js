var keystone = require('keystone');
	/*
	 *	定义抽奖
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'draw';
	locals.data = {
		posts: []
	};
	var property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
			q = keystone.list('Bulletin').model.find().populate('property').where('property',result[0]._id).sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			console.log(err);
		});

	});
	view.render('mobile/services/draw');
};
