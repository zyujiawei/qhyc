var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'product';

	locals.data = {
		_id: []
	};
	locals.data = {
		store: []
	};
	locals.data = {
		category: []
	};
	locals.data._id=req.query._id;
	var categoryid=req.query.categoryid;
	view.on('init', function(next) {
		var q = keystone.list('Category').model.find().where('_id',categoryid);
			q.exec(function(err, results) {
				locals.data.category=results[0];
				next(err);
			});
	});
	view.on('init', function(next) {
	var store = keystone.list('Store').model.find().where('_id',locals.data.category.store);
		store.exec(function(err, results) {
			locals.data.store=results[0].title;
			next(err);
		});
	});
	view.render('business/services/change_Category');
};