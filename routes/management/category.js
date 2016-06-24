var keystone = require('keystone');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
 	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'category';
	locals.data = {
		posts: []
	};
  var _id=req.query._id;
	view.on('init', function(next) {
		var q = keystone.list('Category').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			console.log(err);
		});
	view.render('management/category');
};
