var keystone = require('keystone');
	/*
	 *	定义失物招领
	*/
exports = module.exports = function(req, res) {
 	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'business';
	var _id=req.body._id;
	var orderNumber=req.body.orderNumber;
	var refuse = req.body.refuse;
	if (refuse == "其它") {
		refuse = "";
	};
	var q = keystone.list('Store').model.find().where('businessUser',_id).where('examine','通过').sort('-publishedDate').exec().then(function(sResults) {
		//locals.data.stores = sResults;
		var q = keystone.list('Order').model.find().where('store',sResults[0]._id).where('orderNumber',orderNumber).exec().then(function(oResults) {
			oResults[0].orderExamine = '已取消';
			oResults[0].refuse = refuse+req.body.refuse_more;
			oResults[0].save(function() {
	    });
			res.redirect('/business/location/HomeMessage?userid='+oResults[0].userId+'&_id='+_id+'&contentString=3');//’3‘取消状态
		},function(err){
			console.log(err);
		});     
	},function(err){
		console.log(err);
	}); 
};
