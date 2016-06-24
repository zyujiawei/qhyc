var keystone = require('keystone');
    /*
     *  定义通知公告
    */
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    view.render('business/services/lianxi');
};
