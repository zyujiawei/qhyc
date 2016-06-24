var keystone = require('keystone');

    exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'area_Building';
    var area=req.query.area;
    var q = keystone.list('property_Area').model.find().where('area',area).exec().then(function(result) {
        q = keystone.list('area_Building').model.find().where('area',result[0]._id);
        q.exec(function(err, results) {
            res.send(results);
        });
    },function(err){
        console.log(err);
    });
};
