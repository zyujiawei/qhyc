var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'Fixing';
        locals.data = {
            posts: []
    };
    var id=req.body._id;
    var examine=req.body.examine;
    var q = keystone.list('Fixing').model.find().where('_id',id);
        q.exec(function(err, results) {
        console.log(results);
        locals.data.posts=results;
        results[0].examine=examine;
        results[0].save(function(err) { 
        });
        },function(err){
        console.log(err);
        });
};
