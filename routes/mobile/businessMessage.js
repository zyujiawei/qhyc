var keystone = require('keystone'),
https = require('https');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	locals = res.locals;
	locals.data = {
	    user: []
	};
	var store = req.query.store;
	var property = req.query.property;
	var orderNumber = req.query.orderNumber;
	res.redirect('/mobile/'+encodeURIComponent(property)+'/success?orderNumber='+orderNumber);
	//根据店铺查询商家id、
	var storeModel = keystone.list('Store').model.find().where('_id', store).exec().then(function(result) {
		//根据商家id查询该微信openid
	var business = keystone.list('BusinessUser').model.find().where('_id',result[0].businessUser).exec().then(function(result) {
		var businessopenid = result[0].openid;
		//获取商家access_token
		var token = keystone.list('BusinessToken').model.find().exec().then(function(result) {
			//post json]
			var postData ={
				touser:businessopenid,
				msgtype:'text',
				text:{content: '您有一份新的订单！！'}
			};
			postData = JSON.stringify(postData);//将json对象转换成json对符串 
			var options = {
							hostname: 'api.weixin.qq.com',
							port: 443,
							path: '/cgi-bin/message/custom/send?access_token='+result[0].content,
							method: 'POST',
							headers : {
								'Content-Type' : 'application/json',
								}
							};
			var post_req = https.request(options, function(res){
				res.on('data', function(buffer){
					console.log("buffer"+buffer.toString());//打印返回的json
				});
				res.on('end', function() {
					// console.log('No more data in response.')
				})
			});
			post_req.on('error', function(e) {
				console.log('problem with request: ' + e.message);//打印错误信息
			});
			// write data to request body
			post_req.write(postData+"\n");//写入post数据
			post_req.end();
		});
	});
});
};