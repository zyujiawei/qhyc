var keystone = require('keystone'),
    Types = keystone.Field.Types;
/**
 * 优惠类型 Model
 * ==========
 */
var coupons_type = new keystone.List('Coupons_type', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    singular: '优惠类型',
    plural: '优惠类型'
});
coupons_type.add({
    title: { type: String, required: true, default: '标题' ,label: '标题'},
});
coupons_type.defaultColumns = 'title, state|20%, publishedDate|20%, contact|20%';
coupons_type.register();
