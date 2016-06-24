var keystone = require('keystone');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
	locals = res.locals;
	var businessuser = keystone.list('BusinessUser');
	locals.data = {
		provinces: []
	};
	locals.data = {
		posts: []
	};
	var _id = null,
		province = null,
		city  = null;
	var idexist = req.query._id;
	if (idexist != undefined) {
	  _id = req.query._id;
	}else{
		_id = req.body._id;
	};
	var name = req.body.name;
	var q = keystone.list('Province').model.find().exec().then(function(result) {
		locals.data.provinces=result;
		var q = businessuser.model.find().where('_id',_id).exec().then(function(results) {
			if(name != undefined){
				results[0].name = req.body.name;
			  results[0].nickName = req.body.nickname;
			  results[0].sex = req.body.sex;
			  results[0].city = req.body.inCity;
			  results[0].procince = req.body.inProvince;
			  results[0].country = '中国';
			  results[0].phone = req.body.phone;
			  results[0].save(function() {
			  	locals.data.posts = results[0];
		      });
			}
			locals.data.posts = results[0];
			view.render('business/services/information');
		},function(err){
				console.log(err);
		});
		},function(err){
			console.log(err);
	});     
};