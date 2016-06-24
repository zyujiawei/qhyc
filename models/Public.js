var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 公共交通 Model
 * ==========
 */
var public = new keystone.List('Public', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '公共交通',
	plural: '公共交通'
});
public.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	content: { type: Types.Textarea, wysiwyg: true, height: 150 ,label: '内容'},
});
public.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
public.register();
