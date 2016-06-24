var keystone = require('keystone');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
 	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'business';
	locals.data = {
		_id: []
	};
	locals.data = {
		orders: []
	};
	locals.data = {
		business: []
	};
	locals.data = {
		link: []
	};
	locals.data.business=keystone.get('business');
	locals.data.link=keystone.get('link');
	var _id=req.query._id;
	var orderNumber= req.query.orderNumber;
	var q = keystone.list('Store').model.find().where('businessUser',_id).where('examine','通过').sort('-publishedDate').exec().then(function(sResults) {
		locals.data._id = _id;
		locals.data.stores = sResults;
		//被查询订单
		if(orderNumber != ''){
			var order = new RegExp('^.*' + orderNumber + '.*$');
			var q = keystone.list('Order').model.find().where('store',sResults[0]._id).where('orderNumber',order).exec().then(function(oResults) {
				locals.data.orders=oResults;
				view.render('business/services/order'); //跳转订单页面 
			},function(err){
				console.log(err);
			}); 
		}
		else{
			var q = keystone.list('Order').model.find().where('store',sResults[0]._id).exec().then(function(oResults) {
				locals.data.orders=oResults;
				view.render('business/services/order'); //跳转订单页面 
			},function(err){
				console.log(err);
			}); 			
		}
	},function(err){
		console.log(err);
	}); 
};
