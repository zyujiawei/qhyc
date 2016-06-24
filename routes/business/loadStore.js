var keystone = require('keystone');

    exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    var store=req.query.store;
    var storeQuery = keystone.list('Store').model.find().where('title',store).exec().then(function(result) {
        var category = keystone.list('Category').model.find().where('store',result[0]._id).exec().then(function(result) {
            res.send(result);
        },function(err){
        console.log(err);
    });
},function(err){
    console.log(err);
});
};
