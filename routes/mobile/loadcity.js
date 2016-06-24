var keystone = require('keystone');

    exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'User';
    var province=req.query.province;
    var property2 = req.params.property;
    var q = keystone.list('Province').model.find().where('province',province).exec().then(function(result) {
        q = keystone.list('City').model.find().where('province',result[0]._id);
        q.exec(function(err, results2) {
            res.send(results2);
        },function(err){
            console.log(err);
        });
    });
};
