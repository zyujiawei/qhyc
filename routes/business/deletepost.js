var keystone = require('keystone'),
exports = module.exports = function(req, res) {
	locals = res.locals;
	var posttype = req.query.type;
	var id = req.query.id;
	var _id = req.query._id;
	console.log("type++"+posttype+"id+++++"+id);
	listModel = keystone.list(posttype);
	listModel.model.findById(id).remove(function(err) {
		if(posttype == "Store"){
			res.redirect("/business/location/business?_id="+_id);
		}
		if(posttype == "Product"){
			res.redirect("/business/location/common?_id="+_id+"&attr=product");
		}
		if(posttype == "Category"){
			res.redirect("/business/location/common?_id="+_id+"&attr=category");
		}
	});
};