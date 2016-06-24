var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.data = {
        posts: []
    };
    var openid = req.body.openid;
    var property = req.body.property;
    var q = keystone.list('Households').model.find().where('openid',openid);
    q.exec(function(err, result) {
        result[0].property=property;
        result[0].save(function(err) {
        });
        res.redirect('/mobile/'+encodeURIComponent(result[0].property)+'/home');
    });

};
