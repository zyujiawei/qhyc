var keystone = require('keystone'),
https = require('https');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    var code = req.query.code;
    var access_token=null;
    var openid=null;
    var jsons = null;
    locals.section = 'userCenter';
    locals.data = {
        user: []
    };
    locals.data = {
        remind: []
    };
    locals.data = {
        weixin: []
    };
    locals.data = {
        link: []
    };
    locals.data.weixin=keystone.get('weixin');
    locals.data.link=keystone.get('link');
    https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace+'&code='+code+'&grant_type=authorization_code', function(resultss) {
        resultss.on('data', function(d) {
            var json = JSON.parse(d.toString());
            access_token=json.access_token;
            openid=json.openid;
            res.redirect('/mobile/location/jumpUserCenter?openid='+openid);
        });
    }).on('error', function(e) {
    console.error("error"+e);
    });
};
