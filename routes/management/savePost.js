var keystone = require('keystone'),
mkdir = require('./makeDir');
exports = module.exports = function(req, res) {
	var posttype = req.body.posttype;
	var newormodify = req.body.newormodify;
	var id = req.body._id;
	var newPost;
	locals = res.locals;
	locals.data = {
		TemporaryStatePosts: []
	};
	listModel = keystone.list(posttype);
	TemporaryState = keystone.list('TemporaryState');
	// //添加一个事件
 //    var events=require("events");
 //    //对事件进行监听
 //    var test=new events.EventEmitter();
 //    //监听当页面信息成功提交后，接收成功状态并触发bark
 //    test.addListener("finxing",bark);
 //    test.addListener("Lostandfound",barklostandfond);
    //触发bark后，把页面添加的信息添加到临时数据库文件中
    // function bark(){
   //      keystone.list('Fixing').model.find().where('_id',id).exec(function(err,results) {
   //          locals.data.TemporaryStatePosts = results;
   //          //console.log("成功发送失物招领信息。");
   //          var post = new TemporaryState.model({
   //              //这里只添加了信息的类型
   //              type: "故障报修",
   //              property: locals.data.TemporaryStatePosts[0].property,
   //              openid: locals.data.TemporaryStatePosts[0].openid,
   //          });
   //          post.save(function(err) {
   //          });
   //          if(locals.data.TemporaryStatePosts != null){
	  //           keystone.get('io').on('connection', function (socket) {
	  //               var q = keystone.list('User').model.find().where('username',req.user.username).exec().then(function(result) {
	  //                   q = keystone.list('TemporaryState').model.find().where('type','故障报修').where('property',result[0]._id).count();
	  //                   q.exec(function(err, results2) {
	  //                   	socket.statefixing = results2;
	  //                   	socket.broadcast.emit(''+locals.data.TemporaryStatePosts[0].openid+'statefixing', {statefixing: socket.statefixing});
	  //                   });
	  //                   },function(err){
	  //                       console.log(err);
	  //                   });
	  //               var q1 = keystone.list('User').model.find().where('username',req.user.username).exec().then(function(result) {
	  //                   q1 = keystone.list('TemporaryState').model.find().where('property',result[0]._id).count();
	  //                   q1.exec(function(err, results1) {
	  //                   socket.statetotal = results1;
	  //                   socket.broadcast.emit(''+locals.data.TemporaryStatePosts[0].openid+'statetotal', {statetotal: socket.statetotal});
	  //                   });
	  //                   },function(err){
	  //                       console.log(err);
	  //                   });
	  //           });
			// }
   //      });
    // }
   //  function barklostandfond(){
   //      keystone.list('Lostandfound').model.find().where('_id',id).exec(function(err,results) {
   //          locals.data.TemporaryStatePosts = results;
   //          //console.log("成功发送失物招领信息。");
   //          var post = new TemporaryState.model({
   //              //这里只添加了信息的类型
   //              type: "失物招领",
   //              property: locals.data.TemporaryStatePosts[0].property,
   //              openid: locals.data.TemporaryStatePosts[0].openid,
   //          });
   //          post.save(function(err) {
   //          });
   //          if(locals.data.TemporaryStatePosts != null){
	  //           keystone.get('io').on('connection', function (socket) {
	  //               var q = keystone.list('User').model.find().where('username',req.user.username).exec().then(function(result) {
			// 			q = keystone.list('TemporaryState').model.find().where('type','失物招领').where('property',result[0]._id).count();
			// 			q.exec(function(err, results1) {
			// 			socket.statelostandfound = results1;
			// 			socket.broadcast.emit(''+locals.data.TemporaryStatePosts[0].openid+'statelostandfound', {statelostandfound: socket.statelostandfound});
			// 		});
			// 		},function(err){
			// 			console.log(err);
			// 		});
	  //               var q1 = keystone.list('User').model.find().where('username',req.user.username).exec().then(function(result) {
	  //                   q1 = keystone.list('TemporaryState').model.find().where('property',result[0]._id).count();
	  //                   q1.exec(function(err, results1) {
	  //                   socket.statetotal = results1;
	  //                  	socket.broadcast.emit(''+locals.data.TemporaryStatePosts[0].openid+'statetotal', {statetotal: socket.statetotal});
	  //               	});
	  //                   },function(err){
	  //                       console.log(err);
	  //                   });
	  //           });
			// }
   //      });
   //  }
	//新建文件夹
	var dirPath = __dirname + '/../../public/advert/' + req.body._id + '/lostfound';
	mkdir.makeDir(dirPath, '755');
	(newormodify == "modify") ? listModel.model.findById(id).exec(function (err,result) {
		setValues(req,result);
	}) : setValues(req,new listModel.model({ property: req.user, }));

	res.end(req.method);
};

function setValues(req,newPost){
	if (req.body.title) {
		newPost.title = req.body.title;
	}
	if (req.body.author) {
		newPost.author = req.body.author;
	}

	if (req.body.content){
		newPost.content = req.body.content;
	}
	if (req.body.contact){
		newPost.contact = req.body.contact;
	}
	if (req.body.publishedDate){
		newPost.publishedDate = req.body.publishedDate;
	}
	if (req.body.state){
		newPost.state = req.body.state;
	}
	if (req.body.item){
		newPost.item = req.body.item;
	}
	if (req.body.openhr){
		newPost.openhr = req.body.openhr;
	}
	if (req.body.department){
		newPost.department = req.body.department;
	}
	if (req.body.contactpp){
		newPost.contactpp = req.body.contactpp;
	}
	if (req.body.address){
		newPost.address = req.body.address;
	}
	if (req.body.examine){
		newPost.examine = req.body.examine;
	}

	//order
	if (req.body.qq){
		newPost.qq = req.body.qq;
	}
	if (req.body.cellphone){
		newPost.cellphone = req.body.cellphone;
	}
	if (req.body.telephone){
		newPost.telephone = req.body.telephone;
	}
	if (req.body.price){
		newPost.price = req.body.price;
	}
	if (req.body.evalue){
		newPost.evalue = req.body.evalue;
	}
	if (req.body.product){
		newPost.product = req.body.product;
	}
	if (req.body.detail){
		newPost.detail = req.body.detail;
	}
	if (req.body.category){
		newPost.category = req.body.category;
	}
	if (req.body.checkImage) {
		if (req.files.images!=null) {
			newPost._.image.uploadFile(req.files.images,true, function(err,fileData){
				if (fileData){
					newPost.save();
				}
			});
		}
	}
	newPost.save(function(err) {
		// if(req.body.posttype == 'Fixing'){
		// 	test.emit("finxing");
		// }
		// if(req.body.posttype == 'Lostandfound'){
		// 	test.emit("Lostandfound");
		// }
	});
}