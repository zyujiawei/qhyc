var keystone = require('keystone'),
formidable =require('formidable'),
fs = require('fs'),
http = require("http"),
path = require('path');
exports = module.exports = function(req, res, file) {
var view = new keystone.View(req, res);
store = keystone.list('Store');
locals = res.locals;
locals.data = {
        posts: []
};
var q = keystone.list('User').model.find().where('username',req.body.property);//根据所选物业 查询该物业对象(非单个字段，是整个object)
    q.exec(function(err, result) {
        var q2 = keystone.list('StoreType').model.find().where('title',req.body.storeType);//根据所选类别 查询该类别对象
            q2.exec(function(err, result2) {
                var newPost = new store.model({
                title: req.body.storeName,//这里取的是name
                property: result[0],
                type: result2[0],
                image : req.files,
                contact: req.body.contact,
                telephone: req.body.telephone,
                cellphone: req.body.cellphone,
                qq: req.body.qq,
                address: req.body.address,
                detail: req.body.detail,
                });
                newPost._.image.uploadFile(req.files.images,true, function(err,fileData){//判断是否上传图片，if true post 图片
                    if (fileData){
                        console.log(newPost+"asdsadasada");
                        newPost.save();
                    }
                });
                newPost.save(function(err) {
                });
                res.redirect('management/add_merchant');
            });
    });
};