var keystone = require('keystone');

    exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'User';
    var district=req.query.district;
    var property2 = req.params.property;
    var q = keystone.list('District').model.find().where('district',district).exec().then(function(result) {
        q = keystone.list('User').model.find().where('type','物业').where('district',result[0]._id);
        q.exec(function(err, results2) {
            res.send(results2);
        },function(err){
            console.log(err);
        });
    });
};
