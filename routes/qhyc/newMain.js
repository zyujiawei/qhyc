var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
    locals.data = {
        posts: []
    };
    locals.data.posts=keystone.get('weixin')[0].replace;
	view.render('qhyc/newMain');
};
