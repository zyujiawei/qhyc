var keystone = require('keystone'),
http=require("http"),
https = require('https'),
households = keystone.list('Households');
exports = module.exports = function(req, res) {
    var code = req.query.code;
    var openid=null;
    https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace+'&code='+code+'&grant_type=authorization_code', function(result) {
            result.on('data', function(e) {
                var json = JSON.parse(e.toString());
                openid=json.openid;
                households.model.find().where('openid',openid).remove(function(err) {
                    res.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+keystone.get('weixin')[0].replace+"&redirect_uri=http%3A%2F%2F"+keystone.get('www')[0].replace+"%2fmobile%2flocation%2fgetHouseholds&response_type=code&scope=snsapi_userinfo&state=QHYC#wechat_redirect");
                });

            });
        }).on('error', function(e) {
           console.error("error"+e);
        });
};
