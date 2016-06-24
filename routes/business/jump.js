var keystone = require('keystone');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		posts: []
	};
	locals.data = {
		remindOrder: []
	};
	var businessuser = keystone.list('BusinessUser');
	var loginCheck = keystone.list('LoginCheck');
	var _id = req.query._id;
	var openid = req.query.openid;
	var checkid = req.query.checkid;
	if(checkid != 'have'){
		var nickName=req.query.nickName;
		var city=req.query.city;
		var procince=req.query.procince;
		var country=req.query.country;
		var sex=null;
		if (req.query.sex=="1") {
		    	sex= "男"
		    };
		if (req.query.sex=="2") {
		    	sex= "女"
		    };
	}
	var loginTime = parseInt((new Date()).valueOf());
	var q = businessuser.model.find().where('_id',_id).exec().then(function(results) {
		if(checkid != 'have'){
		  results[0].openid = openid;
		  results[0].nickName = nickName,
		  results[0].sex = sex;
		  results[0].city = city;
		  results[0].procince = procince;
		  results[0].country = country;
		  results[0].save(function() {
		  	locals.data.posts = results[0];
	      });
		}
		locals.data.posts = results[0];
		var q2 = keystone.list('Store').model.find().where('businessUser', results[0]._id).where('examine','通过').exec().then(function(result) {
			q2 = keystone.list('Order').model.find().where('store',result[0]._id).where('orderExamine','未处理').count();
			q2.exec(function(err, rResults) {
				locals.data.remindOrder = rResults;
				var q3 = loginCheck.model.find().where('businessId',_id).where('openid',openid).exec().then(function(cResult) {
					if(cResult[0] == null){
						var newPost = new loginCheck.model({
	   				  businessId:_id,
	    				loginTime:loginTime,
	    				openid:openid
	    			});
						newPost.save(function(err) {
	  			  	console.log(err);
						});
					}
					else{
						cResult[0].loginTime = loginTime;
						cResult[0].save(function() {;
	      		});
					}
					view.render('business/mobile-main');
				},function(err){
					console.log(err);
				});
			});
		},function(err){
			console.log(err);
		});
	},function(err){
			console.log(err);
	});
};