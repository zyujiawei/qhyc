var keystone = require('keystone'),
http=require("http");
exports = module.exports = function(req, res) {
    temporary = keystone.list('Temporary');
    var type = req.query.type;
    var property = req.query.property;
    console.log(type);
    console.log('here');
    var q = keystone.list('User').model.find().where('username',property).exec().then(function(result) {
        q = keystone.list('Temporary').model.find().where('type',type).where('property',result[0]._id).remove(function(err) {
        // post已删除
        });
        });
};
