var keystone = require('keystone'),
formidable =require('formidable'),
fs = require('fs'),
path = require('path');
exports = module.exports = function(req, res) {
		var filePath = req.files.image.path;
		var newName=req.files.image.name;
		var extName = path.extname(req.files.image.name);
		var imgName=req.body.state;
		var imgPath=req.body.property;
		var imageUrl = "/"+imgPath + "/" + imgName + extName;
		var checkPath =__dirname + "/../../advert/"+imgPath;
		var newPath = __dirname + "/../../advert" + imageUrl;
		//把图片从临时文件夹复制到目的文件夹，当然最好删除临时文件
		fs.exists(checkPath, function(existmain){ //判断当前用户文件夹是否存在
			if(existmain){ 
				fs.readFile(filePath, function (err, data) {
					if (err) {
						res.send(err);
						return;
					}
				fs.writeFile(newPath, data, function (err) {//将上传文件写入指定本地文件夹
					if (!err) {
						res.send({uploaded: true});
					} else {
						res.send(err);
					}
				});
				});
			}else{
				fs.mkdir(checkPath, function(err){//如当前用户文件夹不存在，为当前用户创建文件夹
					 if(!err){ 
						 fs.readFile(filePath, function (err, data) {
							if (err) {
								res.send(err);
								return;
							}
						fs.writeFile(newPath, data, function (err) {
							if (!err) {
								res.send({uploaded: true});
							} else {
								res.send(err);
							}
						});
						});
					 }else{
					 } 
				});
			} 
		});
picture = keystone.list('Picture');
var newPost = new picture.model({
	title: req.body.title,
	property: req.body.property,
	state: req.body.state,
	publishedDate: req.body.publishedDate,
	image: newPath
});
newPost.save(function(err) {
	// console.log(err);
	// post has been saved
});
//console.log(filePath);
res.redirect('/advert/manage');//返回至输入页面
};
