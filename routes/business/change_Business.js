var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'store';
	locals.data = {
		posts: []
	};
	var openids=null;
	locals.data = {
		_id: []
	};
	locals.data = {
		storeType: []
	};
	locals.data = {
		provinces: []
	};
	locals.data = {
		property: []
	};
	locals.data = {
		type: []
	};

	locals.data._id=req.query._id;
	var id=req.query.storeid;
	view.on('init', function(next) {
		var province = keystone.list('Province').model.find();
		province.exec(function(err, results) {
			locals.data.provinces=results;
			next(err);
		});
	});
	view.on('init', function(next) {
		var storeType = keystone.list('StoreType').model.find();
			storeType.exec(function(err, results) {
				locals.data.storeType = results;
				next(err);
			});
	});
	view.on('init', function(next) {
		var store= keystone.list('Store').model.find().where('_id',id);
			store.exec(function(err, results) {
				locals.data.posts=results[0];
				next(err);
			});
	});
	view.on('init', function(next) {
	var property =keystone.list('User').model.find().where('_id',locals.data.posts.property);
		property.exec(function(err, results) {
			locals.data.property=results[0].username;
			next(err);
		});
	});
	view.on('init', function(next) {
	var type =keystone.list('StoreType').model.find().where('_id',locals.data.posts.type);
		type.exec(function(err, results) {
			locals.data.type=results[0].title;
			next(err);
		});
	});
	view.render('business/services/change_Business');
};
