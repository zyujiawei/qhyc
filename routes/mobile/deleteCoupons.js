var keystone = require('keystone'),
http=require("http"),
https = require('https'),
user_Coupons = keystone.list('user_Coupons');
exports = module.exports = function(req, res) {
    var number = req.query.number;
    var openid=req.query.openid;
    user_Coupons.model.find().where('openid',openid).where('user_number',number).remove(function(err) {
        res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+keystone.get('weixin')[0].replace+'&redirect_uri=http%3A%2F%2F'+keystone.get('www')[0].replace+'mobile%2flocation%2fuserCenter&response_type=code&scope=snsapi_userinfo&state=around#wechat_redirect');
    });
};
