var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		posts: []
	};
	locals.user = req.user;
	locals.section = 'bulletin';
	if (locals.user){
		view.on('init', function(next) {
			var q = keystone.list('Bulletin').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.populate('property')
			.where('property',locals.user._id)
			.sort('-publishedDate');
			
			q.exec(function(err, results) {
				locals.data.posts = results;
			console.log(results.total);
			next(err);
		});
			
		});
	}
	view.render('management/bulletin');
};
