var keystone = require('keystone'),
https = require('https');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	var code = req.query.code;
	var state = req.query.state;
	var openids=null;
	locals.data = {
		_id: []
	};
	locals.data = {
		posts: []
	};
	locals.data = {
		provinces: []
	};
	var q = keystone.list('Province').model.find().exec().then(function(results) {
		locals.data.provinces=results;
		    var q = keystone.list('StoreType').model.find().exec().then(function(result) {
		    	locals.data._id=req.query._id;
					locals.data.posts = result;
					view.render('business/services/add_Business');
				},function(err){
					console.log(err);
					});
	},function(err){
			console.log(err);
	});     
};