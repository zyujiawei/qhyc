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
	var _id=req.query._id;
	console.log('**************************' + _id);
	var q = keystone.list('Store').model.find().where('businessUser',_id).where('examine','通过').sort('-publishedDate').exec().then(function(sResults) {
		locals.data._id = _id;
		locals.data.stores = sResults;
		var preorders = keystone.list('Order').model.find({},{_id:0,__v:0}).where('store',sResults[0]._id).sort('-orderNumber').exec().then(function(oResults) {
			var string = "[" + oResults + "]";
			var Arrays = eval("(" + string +")");
			locals.data.orders=string;
			view.render('business/services/order'); //跳转订单页面
		},function(err){
			console.log(err);
		});
	},function(err){
		console.log(err);
	}); 
};
