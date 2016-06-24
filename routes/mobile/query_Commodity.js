var keystone = require('keystone');

	exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'Commodity';
	var storeId=req.query.storeId;
	var q = keystone.list('Commodity').model.find().where('store',storeId);
		q.exec(function(err, results) {
			res.send(results);
			});
};
