var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 加盟合作_物业 Model
 * ==========
 */
var property = new keystone.List('Property', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '物业信息',
	plural: '物业信息'
});
property.add({
	title: { type: String, label: '物业名称'},
	address: { type: String, label: '地址'},
	rqnumber: { type: String, label: '小区数量'},
	hdnumber: { type: String, label: '住户数量'},
	email: { type: String, label: 'Email'},
	contact: { type: String, index: true ,label: '联系方式'},
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
});
property.defaultColumns = 'title, email ,contact|20%,publishedDate';
property.register();
