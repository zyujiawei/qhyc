var keystone = require('keystone'),

exports = module.exports = function(req, res) {
households = keystone.list('Households');
var sex=null;
if (req.body.sex=="1") {
    	sex= "男"
    };
if (req.body.sex=="2") {
    	sex= "女"
    };
var newPost = new households.model({
    openid: req.body.openid,//这里取的是name
    nickName: req.body.nickName,
    sex:sex,
    city: req.body.city,
    procince: req.body.procince,
    country: req.body.country,
    headImgurl: req.body.headImgurl,
    privilege: req.body.privilege,
    property: req.body.property,
    district: req.body.district
});
newPost.save(function(err) {
});
var url ='/mobile/'+encodeURIComponent(req.body.property)+'/home';
res.redirect(url);
};
