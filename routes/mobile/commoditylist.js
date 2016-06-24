var keystone = require('keystone');
    /*
     *  定义商品列表和商家详情
     */
    exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'Store';
    //定义商家
    locals.data = {
        store: []
    };
    //定义商品
    locals.data = {
        product: []
    };
    //接收商家_ID参数
    var storeId=req.query.storeId;
    var property = req.params.property;
	view.on('init', function(next) {
		//根据商家列表传来的_ID查询商家详细信息
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
		//根据商家列表传来的_ID查询旗下的所有商品
		var product = keystone.list('Product').model.find().where('store',storeId);
            product.exec(function(err, result_product) {
            //保存 查询到的商品信息
            locals.data.product=result_product;
            next(err);       
            },function(err){
			console.log(err);
			});
	});
    view.render('mobile/services/commoditylist');
	
};
