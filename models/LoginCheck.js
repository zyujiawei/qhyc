var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Product Model
 * ==========
 */
var LoginCheck = new keystone.List('LoginCheck', {
	map: { name: 'loginTime' },
	autokey: { path: 'slug', from: 'loginTime', unique: true },
	singular: '最新登陆时间',
	plural: '最新登陆时间'
});
LoginCheck.add({
	businessId: { type: String, required: true, default:"无", index: true ,label: '商家ID' },
	loginTime: { type: Types.Number, index: true, format:false, label: '最新登陆时间' },
	openid: { type: String, required: true, default:"无", index: true ,label: 'openID' },
});
LoginCheck.defaultColumns = 'businessId|30%, loginTime|30%, openid|30%';
LoginCheck.register();
