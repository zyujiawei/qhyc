var keystone = require('keystone');
	/*
	 *	定义家政服务
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	//定义商家
	locals.data = {
		store: []
	};
	//定义商品
	locals.data = {
		product: []
	};
	var property = req.params.property;
	view.on('init', function(next) {
		var q = keystone.list('StoreType').model.find().where('title','家政服务').exec().then(function(result2) {
			q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
			q = keystone.list('Store').model.find().populate('property').where('type',result2[0]._id).sort('-publishedDate');
			q.exec(function(err, results) {
				locals.data.store = results[0];
				//根据商家列表传来的_ID查询旗下的所有商品
				var product = keystone.list('Product').model.find().where('store',results[0]._id);
					product.exec(function(err, result_product) {
					//保存 查询到的商品信息
					locals.data.product=result_product;
					next(err);
					},function(err){
					console.log(err);
					});
			});
		},function(err){
			console.log(err);
		})
		},function(err){
			console.log(err);
		});
	});
	view.render('mobile/services/commoditylist');
};
