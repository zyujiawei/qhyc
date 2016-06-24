var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Bulletin Model
 * ==========
 */
var feedback = new keystone.List('Feedback', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '反馈意见',
	plural: '反馈意见'
});
feedback.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	publishedDate: { type: Types.Date, index: true, format: 'YYYY-MM-DD',label: '发布日期' },
	content: { type: Types.Textarea, wysiwyg: true, height: 150 ,label: '内容'},
    openid: { type: String, index: true ,label: 'openid'},
});
feedback.defaultColumns = 'title, content, publishedDate|20%';
feedback.register();