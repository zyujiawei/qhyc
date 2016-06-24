var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'fixing';
	locals.data = {
		posts: []
	};
	var openid=req.query.openid;
	var property = req.params.property;
	var q = keystone.list('Fixing').model.find().where('openid',openid);
		q.exec(function(err, results) {
		locals.data.posts=results;
		var q1 = keystone.list('TemporaryState').model.find().where('type','故障报修').where('openid',openid).remove(function(err) {
			// post已删除
			});          
		},function(err){
		console.log(err);
		});
	view.render('mobile/services/user_fixing');
};
