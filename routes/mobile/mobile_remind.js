var keystone = require('keystone'),
http=require("http");
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
    locals.section = 'TemporaryState';
    locals.data = {
        statefixing: []
    };
    locals.data = {
        statelostandfound: []
    };
    locals.data = {
        statetotal: []
    };
    var openid = req.query.openid;
	var q = keystone.list('TemporaryState').model.find().where('type','故障报修').where('openid',openid).count();
        q.exec(function(err, results) {
        locals.data.statefixing = results;
    });
    
    var q1 = keystone.list('TemporaryState').model.find().where('type','失物招领').where('openid',openid).count();
        q1.exec(function(err, results1) {
        locals.data.statelostandfound = results1;
    });
    
    var q2 = keystone.list('TemporaryState').model.find().where('openid',openid).count();
        q2.exec(function(err, results2) {
        locals.data.statetotal = results2;
        res.json(locals.data);
    });
    
};
