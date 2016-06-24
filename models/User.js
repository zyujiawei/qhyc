var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');
User.add({
	username: { type: String, required: true, default:"unknown", index: true },
	name: { type: Types.Name, required: true, index: true },
    type: { type: Types.Select, options: '物业, 管理员', default: '物业', index: true,emptyOption: false ,label: '账号类型'},
	email: { type: Types.Email, initial: true, required: true, index: true },
	district: { type: Types.Relationship, ref: 'District', index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});
User.relationship({ ref: 'Post', path: 'author' });
User.defaultColumns = 'name, email, isAdmin';
User.register();
