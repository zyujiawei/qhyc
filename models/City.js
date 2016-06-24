var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * City Model
 * ==========
 */
var City = new keystone.List('City', {
	map: { name: 'city' },
	autokey: { path: 'slug', from: 'city', unique: true },
	singular: '市',
	plural: '市'
});
City.add({
	city: { type: String, required: true, default:"城市名", index: true ,label: '城市名'},
	province: { type: Types.Relationship, ref: 'Province', index: true },
});
City.relationship({ ref: 'Post', path: 'city' });
City.defaultColumns = 'city';
City.register();
