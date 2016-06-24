var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.imageUrl=req.params.property;
	locals.section = 'around';
    locals.data = {
        weixin: []
    };
    locals.data = {
        link: []
    };
    locals.data = {
        property: []
    };
    if("" != req.query.openid){
        locals.data = {
            openid: []
        };
        locals.data.openid=req.query.openid;
    }
    locals.data.property = req.params.property;
    locals.data.weixin=keystone.get('weixin');
    locals.data.link=keystone.get('link');
	view.render('mobile/around');
};
