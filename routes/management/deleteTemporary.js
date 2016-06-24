var keystone = require('keystone'),

exports = module.exports = function(req, res) {
	var posttype = req.query.type;
	var id = req.query.id;
	listModel = keystone.list(posttype);
	listModel.model.findById(id)
			.remove(function(err) {
			});
	res.redirect("/management/bulletin");
};

	