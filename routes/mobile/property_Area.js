var keystone = require('keystone');

    exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'property_Area';
    var property=req.query.property;
    var property2 = req.params.property;
    var q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
        q = keystone.list('property_Area').model.find().where('property',result[0]._id).sort('publishedDate');
        q.exec(function(err, results) {
            res.send(results);
        });
    },function(err){
        console.log(err);
    });
};