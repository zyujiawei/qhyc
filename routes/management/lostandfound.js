var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		posts: []
	};
	locals.user = req.user;
	locals.section = 'lostandfound';
	if (locals.user){
	view.on('init', function(next) {
		var q = keystone.list('Lostandfound').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.populate('property')
			.where('property',locals.user._id)
			.sort('-publishedDate');
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
	});
	}
var q = keystone.list('User').model.find().where('username',req.user.username).exec().then(function(result) {
    q = keystone.list('Temporary').model.find().where('type','失物招领').where('property',result[0]._id).remove(function(err) {
    // post已删除
    });
    });
	view.render('management/lostandfound');
};
