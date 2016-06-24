var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'order';
	locals.data = {
		posts: []
	};
	var openid=req.query.openid;
	var property = req.params.property;
	var q = keystone.list('Order').model.find().where('userId',openid).sort('-orderNumber');
        q.exec(function(err, results) {
        	locals.data.posts=results;
		 	view.render('mobile/services/user_shop');     
        },function(err){
		console.log(err);
		});
};
