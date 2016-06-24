var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
	http = require("http"),
	path = require('path');
	mkdir = require('./makeDir');
exports = module.exports = function(req, res, file) {
	lostandfound = keystone.list('Lostandfound');
	Temporary = keystone.list('Temporary');
	locals = res.locals;
	locals.data = {
		posts: []
	};
	locals.data = {
		TemporaryPosts: []
	};
	//添加一个事件
	var events = require("events");
	var lostandfoundevent = new events.EventEmitter();
	lostandfoundevent.addListener("SUCCESS", bark);

	function bark() {
		keystone.list('User').model.find().where('username', req.params.property).exec(
			function(err, results) {
				locals.data.TemporaryPosts = results;
				var post = new Temporary.model({
					type: "失物招领",
					property: locals.data.TemporaryPosts[0],
				});
				post.save(function(err) {});
				keystone.get('io').on('connection', function(socket) {
					var q = keystone.list('User').model.find().where('username', req.params
						.property).exec().then(function(result) {
						q = keystone.list('Temporary').model.find().where('type', '失物招领').where(
							'property', result[0]._id).count();
						q.exec(function(err, results) {
							//将查询的数据存储至socket
							socket.remindlostandfound = results;
							//后台将未读失物招领交互到前台 传给在线的物业
							socket.broadcast.emit('' + result[0].username +
								'remindlostandfound', {
									remindlostandfound: socket.remindlostandfound
								});
						});
					}, function(err) {
						console.log(err);
					});
					var q4 = keystone.list('User').model.find().where('username', req.params
						.property).exec().then(function(result) {
						q4 = keystone.list('Temporary').model.find().where('property',
							result[0]._id).count();
						q4.exec(function(err, results4) {
							socket.remindtotal = results4;
							socket.broadcast.emit('' + result[0].username + 'remindtotal', {
								remindtotal: socket.remindtotal
							});
						});
					}, function(err) {
						console.log(err);
					});
				});
			});
	}
var property = req.params.property;
keystone.list('User').model.find().where('username',property).exec(function(err,results) {
	locals.data.posts = results;
	var newPost = new lostandfound.model({
		title: req.body.title,//这里取的是name
		state: req.body.state,
		author: req.body.author,
		contact: req.body.number,
		content: req.body.content,
		image : req.files,
		property: locals.data.posts[0],
		openid: req.body.openid,
		publishedDate: req.body.publishedDate,
	});
	var dirPath = __dirname + '/../../public/advert/' + locals.data.posts[0]._id + '/lostandfound';
	mkdir.makeDir(dirPath, '755');
	newPost._.image.uploadFile(req.files.images,true,function(err,fileData){
		if (fileData){
			newPost.save();
		}
	});
	newPost.save(function(err) {
		lostandfoundevent.emit("SUCCESS");
		console.log(err+"err");
	});
});
res.redirect('/mobile/'+encodeURIComponent(req.params.property)+'/home');
};
