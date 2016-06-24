var keystone = require('keystone');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'userCenter';
    var openid = req.query.openid;
    locals.data = {
        weixin: []
    };
    locals.data = {
        link: []
    };
    locals.data = {
        property: []
    };
    locals.data = {
        user: []
    };
    locals.data = {
        remind: []
    };
    if("" != openid){
        locals.data = {
            openid: []
        };
        locals.data.openid=openid;
    }
    locals.data.property = req.params.property;
    locals.data.weixin=keystone.get('weixin');  
    locals.data.link=keystone.get('link');
    var q = keystone.list('Households').model.find().where('openid',openid);
        q.exec(function(err, results) {
             if (results=="") {
                 locals.data.remind="请先进入物业服务注册小区再查看用户中心。";
                 view.render('mobile/services/remindUser');
             } else {
                locals.data.user = results[0];
                view.render('mobile/userCenter')
            };
        });
};
