var keystone = require('keystone'),
https = require('https');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    var code = req.query.code;
    var state=req.query.state;
    var access_token=null;
    var openid=null;
    var jsons = null;
    locals.section = 'Households';
    locals.data = {
        user: []
    };
    https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace+'&code='+code+'&grant_type=authorization_code', function(resultss) {
        resultss.on('data', function(d) {
            var json = JSON.parse(d.toString());
            access_token=json.access_token;
            openid=json.openid;
            https.get('https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN', function(result) {
                result.on('data', function(e) {
                    jsons = JSON.parse(e.toString());
                    locals.data.user=jsons;
                    var q = keystone.list('Households').model.find().where('openid',openid);
                    q.exec(function(err, results) {
                        if (results=="") {
                            var openid=locals.data.user.openid;
                            var nickName=locals.data.user.nickname;
                            var sex=locals.data.user.sex;
                            var city=locals.data.user.city;
                            var procince=locals.data.user.province;
                            var country=locals.data.user.country;
                            var headImgurl=locals.data.user.headimgurl;
                            var privilege=locals.data.user.privilege;
                            res.redirect('/mobile/location/addHouseholds?openid='+openid+'&nickName='+encodeURIComponent(nickName)+'&sex='+sex+'&city='+encodeURIComponent(city)+'&procince='+encodeURIComponent(procince)+'&country='+encodeURIComponent(country)+'&headImgurl='+headImgurl+'&privilege='+privilege);
                        } else {
                            res.redirect('/mobile/'+encodeURIComponent(results[0].property)+'/'+state+"?openid="+locals.data.user.openid);
                        };
                    });
});
}).on('error', function(e) {
    console.error("error"+e);
});
});
}).on('error', function(e) {
    console.error("error"+e);
});
};
