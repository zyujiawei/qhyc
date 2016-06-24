var keystone = require('keystone'),
https = require('https');
	/*
	 *	跳转添加商品
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		_id: []
	};
	locals.data = {
		posts: []
	};
	locals.data._id=req.query._id;
	var q = keystone.list('Store').model.find().where('businessUser',req.query._id).where('examine','通过').sort('-publishedDate').exec().then(function(results) {
		locals.data.posts = results;
		view.render('business/services/add_Product');
	},function(err){
			console.log(err);
	});
};