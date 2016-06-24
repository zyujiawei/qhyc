var keystone = require('keystone'),

exports = module.exports = function(req, res) {
feedback = keystone.list('Feedback');
var newPost = new feedback.model({
    title: req.body.title,//这里取的是name
    content: req.body.content,
    publishedDate: req.body.publishedDate,
    openid: req.body.openid,
});
newPost.save(function(err) {
});
res.redirect('/mobile/'+encodeURIComponent(req.params.property)+'/home');
};
