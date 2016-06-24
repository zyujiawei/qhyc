var keystone = require('keystone');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
 	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'business';
	locals.data = {
		_id: []
	};
	locals.data = {
		posts: []
	};
	locals.data = {
		name: []
	};
	locals.data = {
        business: []
    };
    locals.data = {
        link: []
    };
    locals.data.business=keystone.get('business');
    locals.data.link=keystone.get('link');

  var _id=req.query._id;
	view.on('init', function(next) {
		var q = keystone.list('Store').model.find().where('businessUser',_id).where('examine','通过').sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data._id = _id;
				locals.data.posts = results;
				next(err);
			});
		},function(err){
			console.log(err);
		});
	view.render('business/services/business');
};
