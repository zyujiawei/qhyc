var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.data = {
        posts: []
    };
    locals.data = {
        posts2: []
    };
    locals.data = {
        openid: []
    };
    locals.data = {
        property: []
    };
    locals.data = {
        dplay: []
    };
    locals.data.openid = req.query.openid;
    var q = keystone.list('Households').model.find().where('openid',req.query.openid);
    q.exec(function(err, result) {
        if (result[0].phone==''||result[0].phone==undefined) {
            var q1 = keystone.list('User').model.find().where('type','物业');
                q1.exec(function(err, results) {
                    locals.data.posts=results;
                    locals.data.property=result[0].property;
                    locals.data.dplay='1';
                    view.render('mobile/services/authentication');
                });
        }else{
            locals.data.posts2=result[0];
            view.render('mobile/services/user_authentication');
        }
    });
};
