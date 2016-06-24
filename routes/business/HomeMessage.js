var keystone = require('keystone'),
https = require('https');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var openid = req.query.userid;
	var _id = req.query._id;
	res.redirect('/business/location/order?_id='+_id); //跳转订单页面

	var content = req.query.contentString;
	var contentString = '';
	if(content == 1 ){
		contentString = '商家已接单！\n请在预约时间内等候阿姨上门为您服务！\n更多订单详情请进入“我的”查看！';
	}else if(content == 2 ){
		contentString = '服务已完成！\n如对我们的工作有任何建议，请登录“我的”页面填写意见反馈。\n感谢您对云城·Home的支持！欢迎再次下单！';
	}else{
		contentString = '商家已取消！\n如需咨询请致电18108535673！';
	}
	//home公众号向用户发消息

	//获取Home access_token
	var token = keystone.list('Token').model.find().exec().then(function(result) {
		//post json
		var postData ={
			touser:openid,
			msgtype:'text',
			text:{content: contentString}
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
		post_req.write(postData);//写入post数据
		post_req.end();

	});
};