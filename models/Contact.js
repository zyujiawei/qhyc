var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Bulletin Model
 * ==========
 */
var contact = new keystone.List('Contact', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '联系物业',
	plural: '联系物业'
});
contact.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	department: { type: String, required: true, default: '部门' ,label: '部门'},
	contact: { type: String, required: true, default: '联系方式' ,label: '联系方式'},
	contactpp: { type: String, required: true, default: '联系人' ,label: '联系人'},
	address: { type: String, required: true, default: '地址' ,label: '地址'},
	publishedDate: { type: Types.Date, index: true, label: '日期' },
});
contact.defaultColumns = 'title, contact|20%,publishedDate';
contact.register();
