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
		orderNumber: []
	};
	locals.data._id=req.query._id;
	locals.data.orderNumber=req.query.orderNumber;
	view.render('business/services/friends'); //跳转订单页面
};
