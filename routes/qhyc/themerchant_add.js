var keystone = require('keystone'),
formidable =require('formidable'),
fs = require('fs'),
path = require('path');
exports = module.exports = function(req, res, file) {
    themerchant = keystone.list('Themerchant');
    locals = res.locals;
    locals.data = {
       posts: []
   };
   var property = req.params.property;
keystone.list('User').model.find().where('username',property).exec(function(err,results) {
    locals.data.posts = results;
    var newPost = new themerchant.model({
       title: req.body.title,
       content: req.body.content,
       contact: req.body.contact,
       publishedDate: req.body.publishedDate
    });

    newPost.save(function(err) {
    });
});
var url=req.body.url;
res.redirect("/");//返回至输入页面
};