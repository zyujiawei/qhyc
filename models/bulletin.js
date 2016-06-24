var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Bulletin Model
 * ==========
 */
var bulletin = new keystone.List('Bulletin', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '通知公告',
	plural: '通知公告'
});
bulletin.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	publishedDate: { type: Types.Date, index: true, format: 'YYYY-MM-DD',label: '发布日期' },
	content: { type: Types.Textarea, wysiwyg: true, height: 150 ,label: '内容'},
});
bulletin.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
bulletin.register();
