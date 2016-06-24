var keystone = require('keystone'),
Types = keystone.Field.Types;


var TemporaryState = new keystone.List('TemporaryState', {
    map: { name: 'type' },
    autokey: { path: 'slug', from: 'type', unique: true },
    singular: '临时状态',
    plural: '临时状态'
});

TemporaryState.add({
    type: { type: String, required: true, default: '类别' ,label: '类别'},
    property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
    openid: { type: String, index: true ,label: 'openid'},
});

TemporaryState.defaultColumns = 'type, state|20%, author|20%, publishedDate|20%';
TemporaryState.register();
