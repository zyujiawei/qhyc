var keystone = require('keystone');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
 	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'bussiness';
	locals.data = {
		posts: []
	};
	locals.data = {
		name: []
	};
	locals.data = {
        weixin: []
    };
    locals.data = {
        link: []
    };
    locals.data.weixin=keystone.get('weixin');
    locals.data.link=keystone.get('link');
  var id = req.query._id;
	view.on('init', function(next) {
		// var q = keystone.list('BussinessUser').model.find().where('_id',id).exec().then(function(result) {
		// 	locals.data.name = result[0].name;
		// 	q = keystone.list('Store').model.find().where('businessUser',result[0].name).where('examine','通过').sort('-publishedDate');
		// 	q.exec(function(err, results) {
		// 		locals.data.posts = results;
		// 		next(err);
		// 	});
		// },function(err){
		// 	console.log(err);
		// });
	});
	view.render('bussiness/services/bussiness');
};