var keystone = require('keystone');

    exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'User';
    var city=req.query.city;
    var property2 = req.params.property;
    var q = keystone.list('City').model.find().where('city',city).exec().then(function(result) {
        q = keystone.list('District').model.find().where('city',result[0]._id);
        q.exec(function(err, results2) {
            res.send(results2);
        },function(err){
            console.log(err);
        });
    });
};
