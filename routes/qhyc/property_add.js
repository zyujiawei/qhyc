var keystone = require('keystone'),
formidable =require('formidable'),
fs = require('fs'),
path = require('path');
exports = module.exports = function(req, res, file) {
	propertye = keystone.list('Property');
	locals = res.locals;
	locals.data = {
		posts: []
	};
	var property = req.params.property;
	keystone.list('User').model.find().where('username',property).exec(function(err,results) {
		locals.data.posts = results;
		var newPost = new propertye.model({
			title: req.body.title,
			address: req.body.address,
			rqnumber: req.body.rqnumber,
			hdnumber: req.body.hdnumber,
			email: req.body.email,
			contact: req.body.contact,
		});
		newPost.save(function(err) {
			console.log(err);
		});
	});
	var url=req.body.url;
res.redirect("/");//返回至输入页面
};