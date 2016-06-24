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
		storetype_id: []
	};
	var _id = req.body._id;//businessuser id
    var storeid = req.body.storeid;
    var title = req.body.title;
    var contact = req.body.contact;
    var telephone = req.body.telephone;
    var address = req.body.address;
    var detail = req.body.detail;
var storeType = keystone.list('StoreType').model.find().where('title',req.body.storetype).exec().then(function(result) {
		locals.data.storetype_id = result[0]._id;
		var user = keystone.list('User').model.find().where('username',req.body.property).exec().then(function(results) {
			var propertuid=results[0]._id;
			var store = keystone.list('Store').model.find().where('_id',storeid);
			store.exec(function(err, result) {
				result[0].title=title;
				result[0].property=propertuid;
				result[0].type=locals.data.storetype_id;
				result[0].contact=contact;
				result[0].telephone=telephone;
				if(req.files.images != undefined){
					result[0].image=req.files;
				}
				result[0].address=address;
				result[0].detail=detail;
				if(req.files.images != undefined){
					var dirPath = __dirname + '/../../public/advert/' + _id + '/Store';
					mkdir.makeDir(dirPath, '755');
					result[0]._.image.uploadFile(req.files.images,true,function(err,fileData){
						if (fileData){
							result[0].save();
						}
					});
				}
				result[0].save(function(err) {
				});
				res.redirect('/business/location/change_Business?storeid='+storeid+'&_id='+_id);
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
