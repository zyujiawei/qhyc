var keystone = require('keystone'),
Types = keystone.Field.Types;


var Temporary = new keystone.List('Temporary', {
    map: { name: 'type' },
    autokey: { path: 'slug', from: 'type', unique: true },
    singular: '临时通知',
    plural: '临时通知'
});

Temporary.add({
    type: { type: String, required: true, default: '类别' ,label: '类别'},
    property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'}
});

Temporary.defaultColumns = 'type, state|20%, author|20%, publishedDate|20%';
Temporary.register();
