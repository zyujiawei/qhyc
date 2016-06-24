var keystone = require('keystone'),
    Types = keystone.Field.Types;
/**
 * business微信密匙
 * ==========
 */
var businessToken = new keystone.List('BusinessToken', {
    map: { name: 'content' },
    autokey: { path: 'slug', from: 'content', unique: true },
    singular: 'business微信密匙',
    plural: 'business微信密匙'
});
businessToken.add({
    content: { type: String,  label: 'business微信密匙'},
    publishedDate: { type: Types.Datetime, index: true, label: '日期',default: Date.now},
});
businessToken.defaultColumns = ' content|20%, publishedDate|20%';
businessToken.register();
