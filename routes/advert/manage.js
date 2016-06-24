var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = 'picture';
	locals.data = {
		posts: []
	};


	// Load other posts
	view.on('init', function(next) {

		var q = keystone.list('User').model.find();
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			//console.log(err);
		});

	view.render('advert/manage');
	
};
