var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Product Model
 * ==========
 */
var Order = new keystone.List('Order', {
	map: { name: 'orderNumber' },
	autokey: { path: 'slug', from: 'orderNumber', unique: true },
	singular: '订单号',
	plural: '订单号'
});
Order.add({
	orderNumber: { type: String, required: true, default:"订单号", index: true ,label: '订单号'},
	orderTime: { type: String, index: true,  label: '下单时间'},
	orderExamine: { type: Types.Select, options: '未处理, 处理中, 已处理, 已取消', default: '未处理', index: true,emptyOption: false ,label: '订单状态'},
	orderPay: { type: Types.Select, options: '现金付款, 微信支付', default: '货到付款', index: true,emptyOption: false ,label: '支付方式'},
	payExamine: { type: Types.Select, options: '未支付, 已支付', default: '未支付', index: true,emptyOption: false ,label: '支付状态'},
	payTime: { type: String, index: true,  label: '支付时间'},
	pointTime: { type: String, required: true, default:"08:00", index: true,  label: '预约时间'},
	serviceContent: { type: String, default:"无", index: true,  label: '服务内容'},
	store: { type: String, required: true, default:"店铺ID", index: true ,label: '店铺ID'},
	userId: { type: String, required: true, default:"收货人openId", index: true ,label: '收货人openId'},
	user: { type: String, required: true, default:"收货人姓名", index: true ,label: '收货人姓名'},
	address: { type: String, required: true, default:"收货地址", index: true ,label: '收货地址'},
	telephone: { type: String, required: true, default:"联系方式", index: true ,label: '联系方式'},
	productId: { type: String, required: true, default:"商品ID", index: true ,label: '商品ID'},
	product: { type: String, required: true, default:"商品名称", index: true ,label: '商品名称'},
	price: { type: String, required: true, default:"订单价格", index: true ,label: '订单价格'},
	note: { type: String, required: true, default:"备注", index: true ,label: '备注'},
	refuse: { type: String, required: true, default:"无", index: true ,label: '拒绝理由'},
});
Order.defaultColumns = 'orderNumber|30%, orderTime|20%, orderExamine|20%, orderPay|20%, businessUser|20%, user|20%';
Order.register();
