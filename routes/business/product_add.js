var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
	http = require("http"),
	path = require('path');
	mkdir = require('./makeDir');
	/*
	 *	添加商品
	*/
exports = module.exports = function(req, res, file) {
	product = keystone.list('Product');
	locals = res.locals;
	locals.data = {
		storeid: []
	};
var _id = req.body._id;
var store = keystone.list('Store').model.find().where('title',req.body.store).exec().then(function(results) {
	locals.data.storeid = results[0]._id;
	var category = keystone.list('Category').model.find().where('category',req.body.category).where('store',results[0]._id).exec().then(function(result) {
		var newPost = new product.model({
			product: req.body.product,//商品名称
			store:locals.data.storeid,//商铺id
			category: result[0]._id,//商品类别id
			price: req.body.price,//商品价格
			image : req.files,//商品Logo
			evalue: req.body.evalue,//商品评价
		});
		var dirPath = __dirname + '/../../public/advert/' + locals.data.storeid +'/'+ result[0]._id;
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
res.redirect('/business/location/common?attr=product&_id='+_id);
};
