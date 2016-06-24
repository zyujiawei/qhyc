var keystone = require('keystone'),
formidable =require('formidable'),
fs = require('fs'),
path = require('path');
exports = module.exports = function(req, res, file) {
contactus = keystone.list('Contactus');
locals = res.locals;
locals.data = {
	posts: []
};
var property = req.params.property;
keystone.list('User').model.find().where('username',property).exec(function(err,results) {
locals.data.posts = results;
var newPost = new contactus.model({
	title: req.body.title,
	email: req.body.email,
	content: req.body.content
});

newPost.save(function(err) {
	});
});
var url=req.body.url;
res.redirect("/");//返回至输入页面
};