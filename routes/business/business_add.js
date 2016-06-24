var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
	http = require("http"),
	path = require('path');
	mkdir = require('./makeDir');
exports = module.exports = function(req, res, file) {
	store = keystone.list('Store');
	locals = res.locals;
	locals.data = {
		store_id: []
	};
var _id = req.body._id;
var q = keystone.list('StoreType').model.find().where('title',req.body.storetype).exec().then(function(result) {
		locals.data.store_id = result[0]._id;
	  q = keystone.list('User').model.find().where('username',req.body.property).exec().then(function(results) {
			var newPost = new store.model({
				title: req.body.title,//这里取的是name
				property: results[0]._id,//入住小区
				type: locals.data.store_id,//商铺类别
				image : req.files,//商铺Logo
				contact: req.body.contact,//联系人
				telephone: req.body.number,//联系电话
				address: req.body.address,//商铺地址
				detail: req.body.detail,//商铺详情
				businessUser: _id,//商家名称
				publishedDate: req.body.publishedDate,//发布日期
			});
			var dirPath = __dirname + '/../../public/advert/' + _id + '/Store';
			mkdir.makeDir(dirPath, '755');
			newPost._.image.uploadFile(req.files.images,true,function(err,fileData){
				if (fileData){
					newPost.save();
				}
			});
			newPost.save(function(err) {
				console.log(err+"err");
			});    
		},function(err){
			console.log(err);
		}); 
	},function(err){
		console.log(err);
	}); 
res.redirect('/business/location/business?_id=' + _id);
};
