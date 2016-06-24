var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * District  Model
 * ==========
 */
var District = new keystone.List('District', {
	map: { name: 'district' },
	autokey: { path: 'slug', from: 'district', unique: true },
	singular: '区',
	plural: '区'
});
District.add({
	district: { type: String, required: true, default:"区名", index: true ,label: '区名'},
	city: { type: Types.Relationship, ref: 'City', index: true },
});
District.relationship({ ref: 'Post', path: 'district' });
District.defaultColumns = 'district';
District.register();
