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
		stores: []
	};
	locals.data = {
		categorys: []
	};
	locals.data = {
		products: []
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
  var attr = req.query.attr;
	var q = keystone.list('Store').model.find().where('businessUser',_id).where('examine','通过').sort('-publishedDate').exec().then(function(sResults) {
		locals.data._id = _id;
		locals.data.stores = sResults;
		if(attr == 'category'){
			var q = keystone.list('Category').model.find().where('store',sResults[0]._id).exec().then(function(cResults) {
				locals.data.categorys=cResults;
				view.render('business/services/category'); //如果新增类别跳转之
			},function(err){
				console.log(err);
			});     
		}
		else if(attr == 'product'){  
			var q = keystone.list('Product').model.find().where('store',sResults[0]._id).exec().then(function(pResults) {
				locals.data.products=pResults;
				view.render('business/services/product'); //如果新增商品跳转之
			},function(err){
				console.log(err);
			});
		}
		else{
			view.render('business/services/error'); //错误处理跳转之
		}
	},function(err){
		console.log(err);
	}); 
};
