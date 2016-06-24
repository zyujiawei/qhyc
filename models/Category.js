var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Category Model
 * ==========
 */
var Category = new keystone.List('Category', {
	map: { name: 'category' },
	autokey: { path: 'slug', from: 'category', unique: true },
	singular: '类别名称',
	plural: '类别名称'
});
Category.add({
	category: { type: String, required: true, default:"类别名称", index: true ,label: '类别名称'},
	store: { type: Types.Relationship, ref: 'Store', index: true },
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
});
Category.relationship({ ref: 'Post', path: 'store' });
Category.defaultColumns = 'category, store|20%, publishedDate|20%';
Category.register();
