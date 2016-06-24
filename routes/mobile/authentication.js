var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.data = {
        posts: []
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
    locals.data.property = req.params.property;
    locals.data.openid = req.query.openid;
    var q1 = keystone.list('District').model.find().where('district',req.query.district).exec().then(function(result) {
        q1 = keystone.list('User').model.find().where('type','物业').where('district',result[0]._id);
        q1.exec(function(err, results) {
            locals.data.posts=results;
            locals.data.dplay='2';
            view.render('mobile/services/authentication');
        });
    },function(err){
        console.log(err);
    });   
};
