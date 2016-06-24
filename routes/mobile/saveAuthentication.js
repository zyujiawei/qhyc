var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.data = {
        posts: []
    };
    var openid = req.body.openid;
    var property = req.body.property;
    //var area = req.body.area;
    //var building = req.body.building;
    var name = req.body.name;
    var phoneNumber = req.body.phoneNumber;
    var address = req.body.address;
    
    var q = keystone.list('Households').model.find().where('openid',openid);
        q.exec(function(err, result) {
            //result[0].property=property;
            //result[0].area=area;
            //result[0].building=building;
            result[0].name=name;
            result[0].phone=phoneNumber;
            result[0].address=address;
            result[0].save(function(err) {
            });
            res.redirect('/mobile/'+encodeURIComponent(property)+'/home');
        });
    // http.get("http://www.stongnet.com/sdkhttp/sendsms.aspx?reg=101100-WEB-HUAX-244176&pwd=THKMMFPI&sourceadd=&phone="+phone+"&content=您的验证码是"+check+"，请尽快使用。如非本人操作请忽略本短信。【前海云城】", function(result) {
    // result.on('data', function(d) {
    // });
    // }).on('error', function(e) {
    //     console.error("error"+e);
    // });
};
