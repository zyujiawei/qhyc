var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 加盟合作_商家 Model
 * ==========
 */
var themerchant = new keystone.List('Themerchant', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '商家信息',
	plural: '商家信息'
});
themerchant.add({
	title: { type: String, label: '商家名称'},
	content: { type: String, label: '产品类型'},
	contact: { type: String, index: true ,label: '联系方式'},
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
});
themerchant.defaultColumns = 'title, content, contact |20%,publishedDate';
themerchant.register();
