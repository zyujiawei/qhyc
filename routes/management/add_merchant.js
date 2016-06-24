var keystone = require('keystone');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.data = {
        property: []
    };
    locals.data = {
        type: []
    };
    var q = keystone.list('User').model.find().where('type','物业');
        q.exec(function(err, result) {
        locals.data.property=result;
        var q1 = keystone.list('StoreType').model.find();
        q1.exec(function(err, results) {
        locals.data.type=results;
        view.render('management/add_merchant');            
        },function(err){
        console.log(err);
        });
        },function(err){
        console.log(err);
        });
   
    locals.user = req.user;   
    
};