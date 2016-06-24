var keystone = require('keystone'),
    Types = keystone.Field.Types;

var area_Building = new keystone.List('area_Building', {
    map: { name: 'building' },
    autokey: { path: 'slug', from: 'building', unique: true },
    singular: '栋单元',
    plural: '栋单元'
});
area_Building.add({
    building: { type: String, label: '栋单元'},
    area: { type: Types.Relationship, ref: 'property_Area', index: true ,label: '区域'},

});
area_Building.defaultColumns = 'building, property ';
area_Building.register();
