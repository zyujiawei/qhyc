var keystone = require('keystone');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		openid: []
	};
	locals.data = {
		nickName: []
	};
	locals.data = {
		sex: []
	};
	locals.data = {
		city: []
	};
	locals.data = {
		procince: []
	};
	locals.data = {
		country: []
	};
	locals.data = {
		headImgurl: []
	};
	locals.data = {
		privilege: []
	};
	locals.data = {
		posts: []
	};
	var openid=req.query.openid;
	var nickName=req.query.nickName;
	var sex=req.query.sex;
	var city=req.query.city;
	var procince=req.query.procince;
	var country=req.query.country;
	var headImgurl=req.query.headImgurl;
	var privilege=req.query.privilege;
	locals.data.openid=openid;
	locals.data.nickName=nickName;
	locals.data.sex=sex;
	locals.data.city=city;
	locals.data.procince=procince;
	locals.data.country=country;
	locals.data.headImgurl=headImgurl;
	locals.data.privilege=privilege;
	var q = keystone.list('Province').model.find();
	q.exec(function(err, results) {
		locals.data.posts=results;
		view.render('mobile/services/households');
	});
};