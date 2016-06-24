var keystone = require('keystone'),
    Types = keystone.Field.Types;
/**
 * 失物招领 Model
 * ==========
 */
var token = new keystone.List('Token', {
    map: { name: 'content' },
    autokey: { path: 'slug', from: 'content', unique: true },
    singular: '微信密匙',
    plural: '微信密匙'
});
token.add({
    content: { type: String,  label: '商品描述'},
    publishedDate: { type: Types.Datetime, index: true, label: '日期',default: Date.now},
});
token.defaultColumns = ' content|20%, publishedDate|20%';
token.register();
