var keystone = require('keystone'),
    Types = keystone.Field.Types;

var property_Area = new keystone.List('property_Area', {
    map: { name: 'area' },
    autokey: { path: 'slug', from: 'area', unique: true },
    singular: '所属区域',
    plural: '所属区域'
});
property_Area.add({
    area: { type: String, label: '区域'},
    property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
    publishedDate: { type: Types.Datetime, index: true, label: '日期',default: Date.now},
});
property_Area.defaultColumns = 'title, email ,contact|20%,publishedDate';
property_Area.register();
