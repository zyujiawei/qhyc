var keystone = require('keystone'),
http = require('http'),
moment = require('moment');


exports = module.exports = function(req, res) {
var view = new keystone.View(req, res);
order = keystone.list('Order');
locals = res.locals;
locals.data = {
    user: []
};
//添加一个事件
var events = require("events");
//对事件进行监听
var orderEvent = new events.EventEmitter();
//监听当页面信息成功提交后，接收成功状态并触发bark
orderEvent.addListener("SUCCESS", bark);
//触发bark后，把页面添加的信息添加到临时数据库文件中
function bark() {
    //socket 实时显示未处理订单
    keystone.get('io').on('connection', function(socket) {
        var q = keystone.list('Store').model.find().where('_id', req.body.store).exec().then(function(result) {
            var businessuser_id = result[0].businessUser;
            q = keystone.list('Order').model.find().where('store',req.body.store).where('orderExamine','未处理').count();
            q.exec(function(err, results) {
                //将查询的数据存储至socket
                socket.remindOrder = results;  
                //后台将未处理叮当交互到前台 传给在线的店铺
                socket.emit('' + businessuser_id + 'remindOrder', {
                    remindOrder: socket.remindOrder
                });  
            });
        }, function(err) {
            console.log(err);
        });
    });
    res.redirect('/mobile/location/businessMessage?store='+req.body.store+'&property='+encodeURIComponent(req.body.property)+'&orderNumber='+timestamp);
}
var property = req.params.property;
var timestamp = (new Date()).valueOf();
var myDate = moment().format("YYYY-MM-DD HH:mm:ss");
var total_fee = req.body.price;
var orderPay = req.body.state,
		payExamine = '',
		payTime = '';
var pointTime = req.body.date + ' ' + req.body.hour + ':' + req.body.minute;
if(orderPay == '微信支付'){
	payExamine = '已支付';
	payTime = myDate;
}
var serviceContent=null;
if(req.body.type=="日常保洁"){
    serviceContent=req.body.serviceContent+"小时"
}else{
    serviceContent=req.body.serviceContent+"平方米"
}
//查询首次
var onlyone = keystone.list('Order').model.find().where('userId',req.body.userId).count().exec().then(function(oResults) {
	if(oResults == 0 && orderPay == '微信支付'){
			total_fee = total_fee-10;
		}
	var newPost = new order.model({
	    orderNumber:timestamp,
	    orderTime:myDate,
	    orderPay:orderPay,
	    payExamine:payExamine,
	    payTime:payTime,
	    pointTime:pointTime,
	    serviceContent:serviceContent,
	    store:req.body.store,
	    userId:req.body.userId,
	    user:req.body.user,
	    address:req.body.address == "" ? "无" : req.body.address,
	    telephone:req.body.telephone,
	    productId:req.body.productId,
	    product:req.body.product,
	    price:total_fee,
	    note:req.body.note == "" ? "无" : req.body.note,
	});
	newPost.save(function(err) {
	    orderEvent.emit("SUCCESS");
	});
},function(err){
	console.log(err);
});
};
