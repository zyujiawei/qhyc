var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'product';

	locals.data = {
		_id: []
	};
	locals.data = {
		productPosts: []
	};
	locals.data = {
		store: []
	};
	locals.data = {
		category: []
	};
	locals.data = {
		posts: []
	};
	locals.data._id=req.query._id;
	var productid=req.query.productid;
	view.on('init', function(next) {
		var product = keystone.list('Product').model.find().where('_id',productid);
			product.exec(function(err, results) {
				locals.data.productPosts=results[0];
				next(err);
			});
	});
	view.on('init', function(next) {
		var stores = keystone.list('Store').model.find().where('businessUser',req.query._id).where('examine','通过').sort('-publishedDate');
			stores.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
	});
	view.on('init', function(next) {
	var store = keystone.list('Store').model.find().where('_id',locals.data.productPosts.store);
		store.exec(function(err, results) {
			locals.data.store=results[0].title;
			next(err);
		});
	});
	view.on('init', function(next) {
	var category = keystone.list('Category').model.find().where('_id',locals.data.productPosts.category);
		category.exec(function(err, results) {
			locals.data.category=results[0].category;
			next(err);
		});
	});
	view.render('business/services/change_Product');
};