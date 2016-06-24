var keystone = require('keystone'),
url = require('url'),
util = require('util'),
https = require('https');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
 	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'business';
	var contentString = '';
	var _id=req.body.confirmId;
	var orderNumber=req.body.number;
	var q = keystone.list('Store').model.find().where('businessUser',_id).where('examine','通过').sort('-publishedDate').exec().then(function(sResults) {
		//locals.data.stores = sResults;
		var q = keystone.list('Order').model.find().where('store',sResults[0]._id).where('orderNumber',orderNumber).exec().then(function(oResults) {
			if(oResults[0].orderExamine == '未处理'){
				oResults[0].orderExamine = '处理中';
				contentString = '1';
			}else{
				oResults[0].orderExamine = '已处理';
				contentString = '2';
			}
			oResults[0].save(function() {				
				res.redirect('/business/location/HomeMessage?userid='+oResults[0].userId+'&_id='+_id+'&contentString='+contentString); //跳转订单页面
			});
		},function(err){
			console.log(err);
		});	 
	},function(err){
		console.log(err);
	}); 
};
