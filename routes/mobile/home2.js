var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'home';
	locals.imageUrl=req.params.property;
	var openid = req.query.openid;

	locals.data = {
		weixin: []
	};
	locals.data = {
		link: []
	};
	locals.data = {
		property: []
	};
	if("" != openid){
		locals.data = {
	        openid: []
	    };
	    locals.data.openid=openid;
	}
	locals.data.property = req.params.property;
	locals.data.weixin=keystone.get('weixin');
	locals.data.link=keystone.get('link');
	view.render('mobile/home');
};
