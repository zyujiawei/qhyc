var keystone = require('keystone'),
https = require('https');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		posts: []
	};
	locals.data = {
		provinces: []
	};
	var _id = req.query._id;
	var q = keystone.list('Province').model.find().exec().then(function(results) {
		locals.data.provinces=results;
    var q = keystone.list('BusinessUser').model.find().where('_id',_id).exec().then(function(result) {
			locals.data.posts = result[0];
			view.render('business/services/update_info');  
		},function(err){
			console.log(err);
			});
	},function(err){
			console.log(err);
	});   
};