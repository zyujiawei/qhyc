var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.data = {
        openid: []
    };
    locals.data = {
        post: []
    };
    locals.data.openid = req.query.openid;
    var q = keystone.list('Province').model.find();
    q.exec(function(err, result) {
        locals.data.post=result;
        view.render('mobile/services/changeProperty');
    });
};
