var keystone = require('keystone'),
    Types = keystone.Field.Types;

var commodity = new keystone.List('Commodity', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'store', unique: true },
    singular: '商品信息',
    plural: '商品信息'
});
commodity.add({
    title: { type: String, required: true, default: '商家名称' ,label: '商家名称'},
    store: { type: Types.Relationship, ref: 'Store', index: true ,label: '所属商家'},
    content: { type: String,  label: '商品描述'},
    originalPrice: { type: String, label: '原价'},
    price: { type: String, label: '优惠价'},
    publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
});
commodity.defaultColumns = 'title, store|20%, state|20%, content|20%, price|20%';
commodity.register();
