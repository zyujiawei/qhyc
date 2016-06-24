var keystone = require('keystone'),
    Types = keystone.Field.Types;

var building_Unit = new keystone.List('building_Unit', {
    map: { name: 'unit' },
    autokey: { path: 'slug', from: 'unit', unique: true },
    singular: '单元名称',
    plural: '单元名称'
});
building_Unit.add({
    unit: { type: String, label: '单元名称'},
    building: { type: Types.Relationship, ref: 'area_Building', index: true ,label: '所属栋'},

});
building_Unit.defaultColumns = 'unit, building ';
building_Unit.register();
