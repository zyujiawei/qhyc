var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 联系我们 Model
 * ==========
 */
var contactus = new keystone.List('Contactus', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '联系我们',
	plural: '联系我们'
});
contactus.add({
	title: { type: String, label: '联系人'},
	email: { type: String, label: 'Email'},
	content: { type: Types.Textarea, wysiwyg: true, height: 150 ,label: '内容'}
});
contactus.defaultColumns = 'title, email ,content|20%,publishedDate';
contactus.register();
