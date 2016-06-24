var keystone = require('keystone');
	/*
	 *	定义商品详情
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
    locals.data = {
        weixin: []
    };
    locals.data = {
        link: []
    };
    locals.data.weixin=keystone.get('weixin');
    locals.data.link=keystone.get('link');
    var storeId=req.query.storeId;
    var productId=req.query.productId;
	var property = req.params.property;
    var productName = req.query.productname;
	view.on('init', function(next) {
		//根据传来的storeId查询商家信息
		var store = keystone.list('Store').model.find().where('_id',storeId);
            store.exec(function(err, result_store) {
            //保存 查询到的店铺信息
            locals.data.store=result_store[0];
            next(err);
            },function(err){
			console.log(err);
			});
	});
	view.on('init', function(next) {
		//根据传来的productId查询商品信息
		var product = keystone.list('Product').model.find().where('_id',productId);
            product.exec(function(err, result_product) {
            //保存 查询到的商品信息
            locals.data.product=result_product[0];
            next(err);       
            },function(err){
			console.log(err);
			});
	});
    if(productName == "日常保洁"){
        view.render('mobile/services/daily');
    }else if(productName == "开荒保洁"){
        view.render('mobile/services/newhouse');
    }else{
	   view.render('mobile/services/commodity');
    }
};
