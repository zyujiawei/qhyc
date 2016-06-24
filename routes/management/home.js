var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		lostandfoundPosts: []
	};
	locals.data = {
		fixingPosts: []
	};
	locals.data = {
		complaintPosts: []
	};
	locals.data = {
		bulletinPosts: []
	};
	locals.user = req.user;
	locals.section = 'home';
	if (locals.user){
		view.on('init', function(next) {
		var result0 = keystone.list('Bulletin').paginate({
				page: req.query.page || 1,
				perPage: 8,
				maxPages: 10
			})
			.where('property',locals.user._id)
			.sort('-publishedDate').limit(8);
		result0.exec(function(err, results) {
			locals.data.bulletinPosts = results;
				next(err);
			});
		});

		view.on('init', function(next) {
		var result1 = keystone.list('Fixing').paginate({
				page: req.query.page || 1,
				perPage: 8,
				maxPages: 10
			})
			.populate('property')
			.where('property',locals.user._id)
			.sort('-publishedDate').limit(8);
		result1.exec(function(err, results) {
			locals.data.fixingPosts = results;
				next(err);
			});
		});

		view.on('init', function(next) {
		var result3 = keystone.list('Complaint').paginate({
				page: req.query.page || 1,
				perPage: 8,
				maxPages: 10
			})
			.populate('property')
			.where('property',locals.user._id)
			.sort('-publishedDate').limit(8);
		result3.exec(function(err, results) {
			locals.data.complaintPosts = results;
			next(err);
			});
		});


		
		// var result2 = keystone.list('Fixing').paginate({
		// 		page: req.query.page || 1,
		// 		perPage: 3,
		// 		maxPages: 10
		// 	})
		// 	.populate('property')
		// 	.where('property',locals.user._id)
		// 	.sort('-publishedDate').limit(3);
		// result2.exec(function(err, results) {
		// 		locals.data.fixingPosts = results;
		// 		next(err);
		// 	});

		// var result3 = keystone.list('Complaint').paginate({
		// 		page: req.query.page || 1,
		// 		perPage: 3,
		// 		maxPages: 10
		// 	})
		// 	.populate('property')
		// 	.where('property',locals.user._id)
		// 	.sort('-publishedDate').limit(3);
		// result3.exec(function(err, results) {
		// 	locals.data.complaintPosts = results;
		// 	next(err);
		// 	});	



	}
	view.render('management/home');
};
