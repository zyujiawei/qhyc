var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Province Model
 * ==========
 */
var Province = new keystone.List('Province', {
	map: { name: 'province' },
	autokey: { path: 'slug', from: 'province', unique: true },
	singular: '省',
	plural: '省'
});
Province.add({
	province: { type: String, required: true, default:"省名", index: true ,label: '省名'},
});
Province.relationship({ ref: 'Post', path: 'province' });
Province.defaultColumns = 'province';
Province.register();
