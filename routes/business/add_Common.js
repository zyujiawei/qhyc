var keystone = require('keystone'),
https = require('https');
	/*
	 *	定义
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		_id: []
	};
	locals.data = {  //查询商户的所有店铺
		posts: []
	};
	var attr = req.query.attr;
	locals.data._id = req.query._id;
	var q = keystone.list('Store').model.find().where('businessUser',req.query._id).where('examine','通过').sort('-publishedDate').exec().then(function(results) {
		locals.data.posts=results;
		if(attr == 'category'){
			locals.data.posts=results;
			view.render('business/services/add_Category'); //如果新增类别跳转之
		}
		else if(attr == 'product'){  
			view.render('business/services/add_Product'); //如果新增商品跳转之
		}
		else{
			view.render('business/services/add_Category'); //错误处理跳转之
		}
	},function(err){
			console.log(err);
	});     
};