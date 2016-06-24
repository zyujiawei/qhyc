var keystone = require('keystone'),

exports = module.exports = function(req, res) {
feedback = keystone.list('Feedback');
var newPost = new feedback.model({
    title: req.body.title,//这里取的是name
    content: req.body.content,
    publishedDate: req.body.publishedDate,
});


newPost.save(function(err) {
});
var url=req.body.url;
res.redirect(url);//返回至手机主页
};
