var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'user_Coupons';
	locals.data = {
		posts: []
	};
	var openid=req.query.openid;
	var property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('user_Coupons').model.find().where('openid',openid).where('state','未使用');
            q.exec(function(err, results) {
            locals.data.posts=results;  
            next(err);             
            },function(err){
			console.log(err);
			});
	});
	view.render('mobile/services/user_coupons');
};
