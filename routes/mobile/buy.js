var keystone = require('keystone'),
https = require('https');
	/*
	 *	定义购买页面
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
        openid: []
    };
    locals.data = {
        user: []
    };
    locals.data = {
        weixin: []
    };
    locals.data = {
        link: []
    };
    locals.data.weixin=keystone.get('weixin');
    locals.data.link=keystone.get('link');
    var code = req.query.code;
    var state=req.query.state;
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
	//微信那用户Openid
    https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace+'&code='+code+'&grant_type=authorization_code', function(results) {
        results.on('data', function(d) {
            var json = JSON.parse(d.toString());
            locals.data.openid=json.openid;
            var user = keystone.list('Households').model.find().where('openid',locals.data.openid);
                user.exec(function(err, user) {
                locals.data.user=user[0];
                });
                if(locals.data.openid!=undefined){
                    if(productName == "日常保洁"){
                        view.render('mobile/services/dailyBuy');
                    }else if(productName == "开荒保洁"){
                        view.render('mobile/services/depthBuy');
                    }else{
                        view.render('mobile/services/buy');
                    }
                }else{
                    view.render('mobile/mobile-main');
                }
                
            
	});
	}).on('error', function(e) {
	    console.error("error"+e);
	});
	
};
