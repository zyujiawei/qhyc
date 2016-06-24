var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
	http = require("http"),
	path = require('path');
	mkdir = require('./makeDir');
exports = module.exports = function(req, res, file) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
		storeid: []
	};
	var _id = req.body._id;//businessuser id
var store = keystone.list('Store').model.find().where('title',req.body.store).exec().then(function(result) {
		locals.data.storeid = result[0]._id;
		var category = keystone.list('Category').model.find().where('category',req.body.category).exec().then(function(results) {
			var categoryid=results[0]._id;
			var product = keystone.list('Product').model.find().where('_id',req.body.productid);
			product.exec(function(err, result) {
				result[0].product=req.body.product;
				result[0].category=categoryid;
				result[0].store=locals.data.storeid;
				result[0].price=req.body.price;
				result[0].evalue=req.body.evalue;
				if(req.files.images != undefined){
					result[0].image=req.files;
				}
				if(req.files.images != undefined){
					var dirPath = __dirname + '/../../public/advert/' + locals.data.storeid +'/'+ result[0]._id;
					mkdir.makeDir(dirPath, '755');
					result[0]._.image.uploadFile(req.files.images,true,function(err,fileData){
						if (fileData){
							result[0].save();
						}
					});
				}
				result[0].save(function(err) {
				});
				res.redirect('/business/location/common?attr=product&_id=' + _id);
			},function(err){
			console.log(err);
		}); 
		},function(err){
			console.log(err);
		}); 
	},function(err){
		console.log(err);
	}); 
};
