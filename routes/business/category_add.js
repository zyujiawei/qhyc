var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
exports = module.exports = function(req, res, file) {
	category = keystone.list('Category');
	locals = res.locals;
	locals.data = {  //查询添加的店铺
		posts: []
	};
	var _id = req.body._id;
	var	title = req.body.title;
	var q = keystone.list('Store').model.find().where('businessUser',_id).where('title',title).where('examine','通过').sort('-publishedDate').exec().then(function(results) {
		locals.data.posts=results;
		var newPost = new category.model({
			category: req.body.category,//类别名称
			store: results[0]._id,//店铺名称
		});
		newPost.save(function(err) {
			console.log(err);
		}); 
	},function(err){
			console.log(err);
	});  
	res.redirect('/business/location/common?attr=category&_id=' + _id);
};
