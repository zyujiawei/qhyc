/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 * 
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	User: [
		{ 'name.first': 'Admin', 'name.last': 'User', username:'yuncheng', email: 'zyujiawei@hotmail.com', password: '123', isAdmin: true },
		{ 'name.first': 'Li', 'name.last': 'Sheng', username:'lisheng', email: '1308611440@qq.com', password: '123', isAdmin: true },
		{ 'name.first': 'Zou', 'name.last': 'Xing', username:'zouxing', email: '1157625314@qq.com', password: '123', isAdmin: true },
		{ 'name.first': 'Shi', 'name.last': 'Chenglin', username:'shichenglin', email: '15926180298@163.com', password: '123', isAdmin: true },
		{ 'name.first': 'Lu', 'name.last': 'Jiangwen', username:'lujiangwen', email: '1491146124@qq.com', password: '123', isAdmin: true },

	]
};

/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin(admin, done) {
	
	var newAdmin = new User.model(admin);
	
	newAdmin.isAdmin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done(err);
	});
	
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};

*/
