var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
	http = require('http'),
	path = require('path');
	mkdir = require('./makeDir');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	fixing = keystone.list('Fixing'); //数据库模型.
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
	//对事件进行监听
	var fixingevent = new events.EventEmitter();
	//监听当页面信息成功提交后，接收成功状态并触发bark
	fixingevent.addListener("SUCCESS", bark);
	//触发bark后，把页面添加的信息添加到临时数据库文件中
	function bark() {
		keystone.list('User').model.find().where('username', req.params.property).exec(
			function(err, results) {
				locals.data.TemporaryPosts = results;
				//console.log("成功发送失物招领信息。");
				var post = new Temporary.model({
					//这里只添加了信息的类型
					type: "故障报修",
					property: locals.data.TemporaryPosts[0],
				});
				post.save(function(err) {});
				keystone.get('io').on('connection', function(socket) {
					var q3 = keystone.list('User').model.find().where('username', req.params
						.property).exec().then(function(result) {
						q3 = keystone.list('Temporary').model.find().where('type', '故障报修').where(
							'property', result[0]._id).count();
						q3.exec(function(err, results3) {
							//将查询的数据存储至socket
							socket.remindfixing = results3;
							//后台将未读失物招领交互到前台 传给在线的物业
							socket.broadcast.emit('' + result[0].username + 'remindfixing', {
								remindfixing: socket.remindfixing
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
	var newPost = new fixing.model({
		title: req.body.title,
		item: req.body.item,
		location: req.body.location,
		author: req.body.author,
		contact: req.body.number,
		content: req.body.content,
		property:locals.data.posts[0],
		openid: req.body.openid,
	});
	//新建文件夹
	var dirPath = __dirname + '/../../public/advert/' + locals.data.posts[0]._id + '/fixing';
	mkdir.makeDir(dirPath, '755');
	newPost._.image.uploadFile(req.files.images,true, function(err,fileData){
		if (fileData){
			newPost.save();
		}
	});
//console.log('i am property:' + newPost);
newPost.save(function(err) {
	//当页面信息成功提交时   把成功状态赋给监听事件
	fixingevent.emit("SUCCESS");
	console.log(err);
});
});
res.redirect('/mobile/'+encodeURIComponent(req.params.property)+'/home');
};
