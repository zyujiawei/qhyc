var keystone = require('keystone');
	/*
	 *	定义购买页面
	 */
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.section = 'Store';
	locals.data = {
		posts: []
	};
	var property = req.params.property;
	var orderNumber = req.query.orderNumber;
   
    view.on('init', function(next) {
        var q = keystone.list('Order').model.find().where('orderNumber',orderNumber);
            q.exec(function(err, results) {
                locals.data.posts = results[0];
                next(err);   
        },function(err){
            console.log(err);
        });
    });
view.render('mobile/services/success');
};
