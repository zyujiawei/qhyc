var keystone = require('keystone'),
https = require('https');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'coupons';
    locals.data = {
        posts: []
    };
    locals.data = {
        openid: []
    };
    var code = req.query.code;
    var state = req.query.state;
    var openids=null;
    var property = req.params.property;
    view.on('init', function(next) {
        var q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
            q = keystone.list('Coupons').model.find().populate('property').where('property',result[0]._id).sort('-publishedDate');
            q.exec(function(err, results) {
                locals.data.posts = results;
                next(err);
            });
        },function(err){
            console.log(err);
        });

    });
    https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace+'&code='+code+'&grant_type=authorization_code', function(result) {
    result.on('data', function(d) {
        var json = JSON.parse(d.toString());
        access_token=json.access_token;
        locals.data.openid=json.openid;
        view.render('mobile/services/coupons');    
    });
    }).on('error', function(e) {
        console.error("error"+e);
    });
};
