var keystone = require('keystone'),
http = require('http'),
Uri = require('url');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    var phone = req.query.phoneNumber;
    var check = req.query.checkNumber;
    var url = "http://www.stongnet.com/sdkhttp/sendsms.aspx?reg=101100-WEB-HUAX-244176&pwd=THKMMFPI&sourceadd=&phone="+phone+"&content="+encodeURIComponent("您的验证码是"+check+"，请尽快使用。如非本人操作请忽略本短信。【前海云城】");
    http.get(url, function(result) {
    result.on('data', function(d) {
        res.send("1");
    });
    }).on('error', function(e) {
        console.error("error"+e);
    });
};
