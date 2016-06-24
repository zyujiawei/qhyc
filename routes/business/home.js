var keystone = require('keystone'),
https = require('https');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    var _id = req.query._id,
      access_token = req.query.access_token,
      openid = req.query.openid,
      jsons = null;
    locals.section = 'BusinessUser';
    locals.data = {
        user: []
    };
    locals.data = {
        remind: []
    };
    locals.data = {
        business: []
    };
    locals.data = {
        link: []
    };
    locals.data.business=keystone.get('business');
    locals.data.link=keystone.get('link');
    https.get('https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN', function(result) {
        result.on('data', function(e) {
            jsons = JSON.parse(e.toString());
            locals.data.user=jsons;
            var q = keystone.list('BusinessUser').model.find().where('openid',openid);
            q.exec(function(err, results1) {
                if (results1 == "") {
                    var nickName=locals.data.user.nickname;
                    var sex=locals.data.user.sex;
                    var city=locals.data.user.city;
                    var procince=locals.data.user.province;
                    var country=locals.data.user.country;
                    res.redirect('/business/location/jump?_id='+_id+'&checkid=no&openid='+openid+'&nickName='+encodeURIComponent(nickName)+'&sex='+sex+'&city='+encodeURIComponent(city)+'&procince='+encodeURIComponent(procince)+'&country='+encodeURIComponent(country));
                } else {
                    res.redirect('/business/location/jump?_id='+_id+'&checkid=have&openid='+openid); //非首次登录，'have'仅在jump做判断，无实际意义
                };
            });
        });
    }).on('error', function(e) {
    });
};
