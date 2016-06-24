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
	locals.data = {
		property: []
	};
	locals.data = {
        weixin: []
    };
    locals.data = {
        link: []
    };
    locals.data.weixin=keystone.get('weixin');
    locals.data.link=keystone.get('link');
	var property = req.params.property;
	locals.data.property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
			q = keystone.list('Lostandfound').model.find().where('property',result[0]._id).where('examine','通过').sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			console.log(err);
		});
	});
	view.render('mobile/services/lostandfound');
};