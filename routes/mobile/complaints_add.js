var keystone = require('keystone'),
	formidable = require('formidable'),
	fs = require('fs'),
	http = require('http'),
	path = require('path');
	mkdir = require('./makeDir');
exports = module.exports = function(req, res, file) {
	complaints = keystone.list('Complaint');
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
	var complaintsevent = new events.EventEmitter();
	//监听当页面信息成功提交后，接收成功状态并触发bark
	complaintsevent.addListener("SUCCESS", bark);
	//触发bark后，把页面添加的信息添加到临时数据库文件中
	function bark() {
		keystone.list('User').model.find().where('username', req.params.property).exec(
			function(err, results) {
				locals.data.TemporaryPosts = results;
				//console.log("成功发送失物招领信息。");
				var post = new Temporary.model({
					//这里只添加了信息的类型
					type: "投诉建议",
					property: locals.data.TemporaryPosts[0],
				});
				post.save(function(err) {

				});
				//socket.io申明使用
				keystone.get('io').on('connection', function(socket) {
					var q2 = keystone.list('User').model.find().where('username', req.params
						.property).exec().then(function(result) {
						q2 = keystone.list('Temporary').model.find().where('type', '投诉建议').where(
							'property', result[0]._id).count();
						q2.exec(function(err, results2) {
							//将查询的数据存储至socket
							socket.remindcomplaint = results2;
							//后台将未读失物招领交互到前台 传给在线的物业
							socket.broadcast.emit('' + result[0].username +
								'remindcomplaint', {
									remindcomplaint: socket.remindcomplaint
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
keystone.list('User').model.find().where('username',property).exec(function(err,results){
	locals.data.posts = results;
	var newPost = new complaints.model({
	title: req.body.title,//这里取的是name
	state: req.body.state,
	author: req.body.author,
	contact: req.body.number,
	content: req.body.content,
	openid: req.body.openid,
	property: locals.data.posts[0],
});
//新建文件夹
var dirPath = __dirname + '/../../public/advert/' + locals.data.posts[0]._id + '/complaint';
mkdir.makeDir(dirPath, '755');
//页面图片提交
newPost._.image.uploadFile(req.files.images,true, function(err,fileData){
	if (fileData){
		newPost.save();
	}
});

//console.log('i am property:' + newPost);
//页面文字信息提交
newPost.save(function(err) {
	//当页面信息成功提交时   把成功状态赋给监听事件
	complaintsevent.emit("SUCCESS");
	// console.log(err);
	// post has been saved
});
});
//res.end(req.method);
res.redirect('/mobile/'+encodeURIComponent(req.params.property)+'/home');
};
