/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

 var _ = require('underscore'),
 keystone = require('keystone'),
 middleware = require('./middleware'),
 importRoutes = keystone.importer(__dirname),
 //schedule = require("node-schedule"),
 https = require('https');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.requireUser);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	management: importRoutes('./management'),
	mobile: importRoutes('./mobile'),
	qhyc: importRoutes('./qhyc'),
	advert: importRoutes('./advert'),
  business: importRoutes('./business'),
	shangjia: importRoutes('./shangjia'),
};


// var rule = new schedule.RecurrenceRule();
// var times = [];
// for(var i=1; i<60; i++){
// 	times.push(i+10);
// }
// rule.second = times;
// var c=0;
// var j = schedule.scheduleJob(rule, function(){
// 	c++;
// 	console.log(c);
// 　　});


var timeout = setInterval(function() {
	https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace, function(res) {
		res.on('data', function(d) {
			var json = JSON.parse(d.toString());
			token = keystone.list('Token');
			token.model.remove(function(err) {
	        // 删除数据库中原有的token
	    });
			var newPost = new token.model({
				content: json.access_token,
			});
			newPost.save(function(err) {
			//插入最新token
		});
		});
	}).on('error', function(e) {
		console.error("error"+e);
	});
}, 7190000);
//两小时差10秒更新一次token

//business微信密匙
var businesstimeout = setInterval(function() {
	https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+keystone.get('business')[0].replace+'&secret='+keystone.get('business')[1].replace, function(res) {
		res.on('data', function(d) {
			var json = JSON.parse(d.toString());
			businessToken = keystone.list('BusinessToken');
			businessToken.model.remove(function(err) {
	        // 删除数据库中原有的token
	    });
			var newPost = new businessToken.model({
				content: json.access_token,
			});
			newPost.save(function(err) {
			//插入最新token
		});
		});
	}).on('error', function(e) {
		console.error("error"+e);
	});
}, 7190000);
//两小时差10秒更新一次token

// Setup Route Bindings
exports = module.exports = function(app) {



	//主页qhyc
	app.get('/',routes.qhyc.newMain);
	app.get('/oldMain',routes.qhyc.main);


	// Views

	//联系我们
	app.post('/qhyc/contactus_add.js',routes.qhyc.contactus_add);

	//商家和物业入驻
	app.post('/qhyc/themerchant_add.js',routes.qhyc.themerchant_add);
	app.post('/qhyc/property_add.js',routes.qhyc.property_add);

	//广告管理
	app.get('/advert/manage',routes.advert.manage);
	app.post('/advert/addPicture',routes.advert.addPicture);

	//商品结算页面
	//app.get('/mobile/:property/shopping',routes.mobile.shopping);

	//weixin支付test
	app.get('/mobile/location/weixin_pay',routes.mobile.weixin_pay);
	app.get('/mobile/location/wxnotify',routes.mobile.wxnotify);
	//微信退款
	app.get('/mobile/location/refund',routes.mobile.refund);

	//物业管理页面
	app.post('/management/do_Add_Merchant', routes.management.do_Add_Merchant);
	app.get('/management/add_merchant', routes.management.add_merchant);
	app.get('/management/messag', routes.management.messag);
	app.post('/management/postMessag', routes.management.postMessag);
	app.get('/management/deleteCoupons', routes.management.deleteCoupons);
	app.get('/management/deleteRemind', routes.management.deleteRemind);
	app.get('/management/home', routes.management.home);
	app.get('/management/bulletin', routes.management.bulletin);
	app.get('/management/complaint', routes.management.complaint);
	app.get('/management/contact', routes.management.contact);
	app.get('/management/facility', routes.management.facility);
	app.get('/management/fixing', routes.management.fixing);
	app.get('/management/lostandfound', routes.management.lostandfound);
	app.get('/management/deletepost?', routes.management.deletePost);
	app.post('/management/savepost', routes.management.savePost);
	app.get('/management/auth', routes.management.auth);
	app.post('/management/doChangePassword', routes.management.doChangePassword);

	app.get('/management/store', routes.management.store);//门店管理
	app.get('/management/order', routes.management.order);//订单管理
	app.get('/management/category', routes.management.category);//商品类别管理
	app.get('/management/product', routes.management.product);//商品管理
	//对其他分页面进行数据操作的js
	app.get('/management/doDeleteCoupons', routes.management.doDeleteCoupons);
	app.post('/mobile/:property/user_coupons_add',routes.mobile.user_coupons_add);
	app.post('/mobile/location/household_add',routes.mobile.household_add);
	app.post('/mobile/:property/complaints_add',routes.mobile.complaints_add);
	app.post('/mobile/:property/fixing_add',routes.mobile.fixing_add);
	app.post('/mobile/:property/feedback_add',routes.mobile.feedback_add);
	app.post('/mobile/:property/lostandfound_add',routes.mobile.lostandfound_add);


	//显示主页面下的两个大块
	app.post('/mobile/location/doChangeProperty', routes.mobile.doChangeProperty);
	app.get('/mobile/location/changeProperty', routes.mobile.changeProperty);
	app.post('/mobile/location/saveAuthentication', routes.mobile.saveAuthentication);
	app.get('/mobile/location/authentication', routes.mobile.authentication);
	app.get('/mobile/location/checkPhoneNumber', routes.mobile.checkPhoneNumber);
	app.get('/mobile/location/deleteCoupons', routes.mobile.deleteCoupons);
	app.get('/mobile/:property/coupons', routes.mobile.coupons);
	app.get('/mobile/location/user_authentication', routes.mobile.user_authentication);
	app.get('/mobile/location/user_coupons', routes.mobile.user_coupons);
	app.get('/mobile/location/user_feedback', routes.mobile.user_feedback);
	app.get('/mobile/location/user_complaints', routes.mobile.user_complaints);
	app.get('/mobile/location/user_fixing', routes.mobile.user_fixing);
	app.get('/mobile/location/user_lostandfound', routes.mobile.user_lostandfound);
	app.get('/mobile/location/user_message', routes.mobile.user_message);
	app.get('/mobile/location/user_shop', routes.mobile.user_shop);
	app.get('/mobile/location/jumpUserCenter', routes.mobile.jumpUserCenter);
	app.get('/mobile/:property/userCenter', routes.mobile.userCenter);
	app.get('/mobile/location/getHouseholds', routes.mobile.getHouseholds);
	app.get('/mobile/location/deleteHouseholds', routes.mobile.deleteHouseholds);
	app.get('/mobile/location/addHouseholds', routes.mobile.addHouseholds);
	app.get('/mobile/:property/home', routes.mobile.home);
	app.get('/mobile/:property/around', routes.mobile.around);
	app.get('/mobile/:property/tpog', routes.mobile.tpog);
	app.get('/mobile/:property/draw',routes.mobile.draw);

	//显示物业信息6个分页面的js
	app.get('/mobile/:property/home2',routes.mobile.home2);
	app.get('/mobile/:property/unlock',routes.mobile.unlock);
	app.get('/mobile/:property/businessman',routes.mobile.businessman);
	app.get('/mobile/:property/bulletin',routes.mobile.bulletin);
	app.get('/mobile/:property/complaints',routes.mobile.complaints);
	app.get('/mobile/:property/contacts',routes.mobile.contacts);
	app.get('/mobile/:property/fixing',routes.mobile.fixing);
	app.get('/mobile/:property/lostandfound',routes.mobile.lostandfound);
	app.get('/mobile/:property/facilities',routes.mobile.facilities);
	app.get('/mobile/:property/add_Lostandfound',routes.mobile.add_Lostandfound);
	app.get('/mobile/location/mobile_remind', routes.mobile.mobile_remind);


	//显示意见反馈页面
	app.get('/mobile/:property/feedback',routes.mobile.feedback);

	//显示生活周边6个分页面的js
	app.get('/mobile/:property/area_Building',routes.mobile.area_Building);
	app.get('/mobile/:property/property_Area',routes.mobile.property_Area);
	app.get('/mobile/:property/query_Commodity',routes.mobile.query_Commodity);
	app.get('/mobile/:property/catering',routes.mobile.catering);
	app.get('/mobile/:property/house',routes.mobile.house);
	app.get('/mobile/:property/entertainment',routes.mobile.entertainment);
	app.get('/mobile/:property/economics',routes.mobile.economics);
	app.get('/mobile/:property/healthy',routes.mobile.healthy);
	app.get('/mobile/:property/more',routes.mobile.more);
	//商品详情页面
	app.get('/mobile/:property/commodity',routes.mobile.commodity);
	//确认订单页面
	app.get('/mobile/location/buy',routes.mobile.buy);
	app.post('/mobile/location/buy',routes.mobile.buy);
	//发送购买订单
	app.post('/mobile/location/post_Order',routes.mobile.post_Order);
	//订单成功页面
	app.get('/mobile/:property/success',routes.mobile.success);
	//日常保洁和新房开荒介绍页面
	app.get('/mobile/:property/commoditylist',routes.mobile.commoditylist);
	//使用帮助
	//app.get('/mobile/:property/help',routes.mobile.help);

	app.get('/mobile/:property/loadproperty',routes.mobile.loadproperty);
	app.get('/mobile/:property/loadcity',routes.mobile.loadcity);
	app.get('/mobile/:property/loaddistrict',routes.mobile.loaddistrict);

	//商家端页面
	app.post('/business/location/business_add',routes.business.business_add); //保存商户添加店铺信息
	app.get('/business/location/business',routes.business.business); //门店列表主页
	app.get('/business/location/add_Business',routes.business.add_Business); //
	app.get('/business/location/Businesslogin',routes.business.Businesslogin); //登陆跳转
	app.get('/business/location/loginBusiness',routes.business.loginBusiness); //登录信息验证
	//app.post('/business/location/loginBusiness',routes.business.loginBusiness); //登录信息验证
	app.get('/business/location/loadproperty',routes.mobile.loadproperty); //同mobile加载省
	app.get('/business/location/loadcity',routes.mobile.loadcity); //同mobile加载市
	app.get('/business/location/loaddistrict',routes.mobile.loaddistrict); //同mobile加载区
	app.get('/business/location/home', routes.business.home); //商家主页及获取微信个人信息
	app.get('/business/location/jump',routes.business.jump); //保存个人信息并跳转主页
	app.get('/business/location/information',routes.business.information); //查看个人信息
	app.get('/business/location/update_info',routes.business.update_info); //修改个人信息
	app.post('/business/location/information',routes.business.information); //查看修改后个人信息

	app.get('/business/location/change_Business',routes.business.change_Business); //查看商家信息
	app.post('/business/location/business_Change',routes.business.business_Change); //修改商家信息
	app.get('/business/location/deletepost',routes.business.deletepost); //删除商家信息

	app.post('/business/location/product_add',routes.business.product_add); //添加商品信息
	app.get('/business/location/loadStore',routes.business.loadStore); //加载商品类别
	app.get('/business/location/add_product',routes.business.add_product); //添加商品跳转
	app.get('/business/location/change_product',routes.business.change_product); //
	app.post('/business/location/product_change',routes.business.product_change); //修改商品信息

	app.get('/business/location/add_Common',routes.business.add_Common); //新增类别、商品信息
	app.get('/business/location/common',routes.business.common); //类别、商品主页
	app.post('/business/location/category_add',routes.business.category_add); //添加类别信息
	app.get('/business/location/change_category',routes.business.change_category); //
	app.post('/business/location/category_change',routes.business.category_change); //修改商品信息

	app.get('/business/location/order',routes.business.order); //订单主页
	app.post('/business/location/confirmOrder',routes.business.confirmOrder); //确认订单
	app.post('/business/location/cancleOrder',routes.business.cancleOrder); //取消订单
	app.get('/business/location/friends',routes.business.friends); //友好提示
	app.get('/business/location/orderSearch',routes.business.orderSearch); //查询订单

	app.get('/mobile/location/businessMessage',routes.mobile.businessMessage);//给商家用户发消息
	app.get('/business/location/HomeMessage',routes.business.HomeMessage);//HOME用户发消息

	app.get('/business/location/lianxi',routes.business.lianxi); //联系我们

};
