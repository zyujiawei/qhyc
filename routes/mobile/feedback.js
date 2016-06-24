var keystone = require('keystone'),
https = require('https');
	/*
	 *	反馈意见
	*/
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	var code = req.query.code;
	var state = req.query.state;
	var openids=null;
	locals.data = {
		openid: []
	};
https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[0].replace+'&code='+code+'&grant_type=authorization_code', function(result) {
result.on('data', function(d) {
    var json = JSON.parse(d.toString());
    access_token=json.access_token;
    locals.data.openid=json.openid;
    view.render('mobile/services/feedback');
    
});
}).on('error', function(e) {
    console.error("error"+e);
});

};