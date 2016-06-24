var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
exports = module.exports = function(req, res, file) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	var _id = req.body._id;
	var	categoryid = req.body.categoryid;
	var q = keystone.list('Category').model.find().where('_id',categoryid).exec().then(function(result) {
		result[0].category = req.body.category,//类别名称
		result[0].save(function(err) {
		});
		res.redirect('/business/location/common?attr=category&_id=' + _id);
	},function(err){
			console.log(err);
	});  
};
