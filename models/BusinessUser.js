var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * businessUser Model
 * ==========
 */
var BusinessUser = new keystone.List('BusinessUser');
BusinessUser.add({
	email: { type: Types.Email, initial: true, required: true, index: true },
	openid: { type: String, index: true , default: 'id' ,label: 'id'},
	nickName: { type: String, index: true , default: '用户昵称' ,label: '用户昵称'},
	sex: { type: String, index: true , default: '用户性别' ,label: '用户性别'},
	city: { type: String, index: true , default: '所属城市' ,label: '所属城市'},
	procince: { type: String, index: true , default: '所属省份' ,label: '所属省份'},
	country: { type: String, index: true , default: '所属国家' ,label: '所属国家'},
	phone:{ type: String , index: true ,label: '手机号'},
	name:{ type: String , index: true ,label: '真实姓名'},
	password: { type: String, initial: true, required: true }
}, 'Permissions');

BusinessUser.relationship({ ref: 'Post', path: 'author' });
BusinessUser.defaultColumns = 'name, email, isAdmin';
BusinessUser.register();
