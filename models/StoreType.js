var keystone = require('keystone'),
    Types = keystone.Field.Types;

var storeType = new keystone.List('StoreType', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    singular: '店铺类别',
    plural: '店铺类别'
});
storeType.add({
    title: { type: String, default: '店铺类别' ,label: '店铺类别'},
});
storeType.defaultColumns = 'title';
storeType .register();