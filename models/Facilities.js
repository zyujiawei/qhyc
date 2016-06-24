var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 配套设施 Model
 * ==========
 */
var facilities = new keystone.List('Facilities', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '配套设施',
	plural: '配套设施'
});
facilities.add({
	title: { type: String, required: true, default: '配套设施' ,label: '配套设施'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	author: { type: String, label: '联系人'},
	contact: { type: String, index: true ,label: '联系方式'},
	item: { type: String, label: '设施简介'},
	openhr: { type: String, label: '开放时间'},
	publishedDate: { type: Types.Date, index: true, label: '日期' },
	address: { type: String,label: '地址'},
	use: { type: String, label: '使用说明'}
});
facilities.defaultColumns = 'title, item|20%, openhr|20%, publishedDate|20%';
facilities.register();
