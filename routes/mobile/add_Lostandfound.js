var keystone = require('keystone'),
https = require('https');
	/*
	 *	定义失物招领
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
https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace+'&code='+code+'&grant_type=authorization_code', function(result) {
result.on('data', function(d) {
    var json = JSON.parse(d.toString());
    access_token=json.access_token;
    locals.data.openid=json.openid;
    view.render('mobile/services/add_Lostandfound');
    
});
}).on('error', function(e) {
    console.error("error"+e);
});

};