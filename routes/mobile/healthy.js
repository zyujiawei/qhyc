var keystone = require('keystone');
	/*
	 *	定义医疗健康
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'healthy';
	locals.data = {
		posts: []
	};
	var property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('StoreType').model.find().where('title','医疗健康').exec().then(function(result2) {
			q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
			q = keystone.list('Store').model.find().populate('property').where('property',result[0]._id).where('type',result2[0]._id).sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			console.log(err);
		})
		},function(err){
			console.log(err);
		});
	});
	view.render('mobile/services/healthy');
};
