var keystone = require('keystone'),
//var session = require('../../../lib/session');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	var code = null;
	if (req.body.code != null) {
	  code = req.body.code;
	};
	// If a form was submitted, process the login attempt
	if (req.method === 'POST') {

		if (!keystone.security.csrf.validate(req)) {
			req.flash('error', 'There was an error with your request, please try again.');
			view.render('bussiness/services/loginBussiness');
		}

		if (!req.body.email || !req.body.password) {
			req.flash('error', 'Please enter your email address and password.');
			view.render('bussiness/services/loginBussiness');
		}

		var onSuccess = function (user) {

			if (req.query.from && req.query.from.match(/^(?!http|\/\/|javascript).+/)) {
				res.redirect(req.query.from);
			} else if ('string' === typeof keystone.get('signin redirect')) {
				res.redirect(keystone.get('signin redirect'));
			} else if ('function' === typeof keystone.get('signin redirect')) {
				keystone.get('signin redirect')(user, req, res);
			} else {
				res.redirect('/bussiness/location/home?_id=' + results[0]._id + '&code=' + code);
			}

		};

		var onFail = function (err) {
			var message = (err && err.message) ? err.message : 'Sorry, that email and password combo are not valid.';
			req.flash('error', message );
			renderView();
		};

		//session.signin(req.body, req, res, onSuccess, onFail);

	} else {
		view.render('bussiness/services/loginBussiness');
	}

};

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	var code = null;
	if (req.body.code != null) {
	  code = req.body.code;
	};
	//var passworded = md5.hex_md5(req.body.password);
	var q = keystone.list('BussinessUser').model.find().where('email',req.body.email).where('password',req.body.password);
		q.exec(function(err, results) {
			if(results[0] != null){
				res.redirect('/bussiness/location/home?_id=' + results[0]._id + '&code=' + code);
			}
			else{
				res.redirect('/bussiness/location/home?_id=5603ad041c7ff1f068c5b4fe' + '&code=' + code);
				//view.render('bussiness/services/loginBussiness');
			}
		},function(err){
		console.log(err);
		});
	
};
