var keystone = require('keystone'),
//md5 = require('../md5');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data = {
        code: []
  };
	var username = req.query.username;
  var password = req.query.password;
  var q = keystone.list('BusinessUser').model.find().where('email',username).where('password',password);
	q.exec(function(err, results) {
		if(results[0] != null){
			res.send(results[0]._id);
		}
		else{
			res.send('0');
		}
		//res.send(results[0]);
	},function(err){
	console.log(err);
	});
};
