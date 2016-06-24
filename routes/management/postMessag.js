var keystone = require('keystone'),
http = require('http');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
    locals = res.locals;
    locals.section = 'Households';
        locals.data = {
            posts: []
    };
    var area=req.body.area;
    var building=req.body.building;
    var content=req.body.content;
    if (area=="全体住户") {
        var q = keystone.list('Households').model.find().where('property',req.user.username);
        q.exec(function(err, results) {
        console.log(results);
        locals.data.posts=results;
        for (var i=0; i <results.length; i++) {
            if (locals.data.posts[i].phone!=''||locals.data.posts[i].phone!=undefined) {
                http.get("http://www.stongnet.com/sdkhttp/sendsms.aspx?reg=101100-WEB-HUAX-244176&pwd=THKMMFPI&sourceadd=&phone="+locals.data.posts[i].phone+"&content="+encodeURIComponent(content+"【前海云城】"), function(result) {
                result.on('data', function(d) {
                });
                }).on('error', function(e) {
                    console.error("error"+e);
                });
            }
        };
        },function(err){
        console.log(err);
        });
        view.render('management/messag');
    }else{
        if (building=="全体住户") {
            var q = keystone.list('Households').model.find().where('property',req.user.username).where('area',area);
                q.exec(function(err, results) {
                locals.data.posts=results;
                for (var i=0; i <results.length; i++) {
                    if (locals.data.posts[i].phone!=''||locals.data.posts[i].phone!=undefined) {
                        http.get("http://www.stongnet.com/sdkhttp/sendsms.aspx?reg=101100-WEB-HUAX-244176&pwd=THKMMFPI&sourceadd=&phone="+locals.data.posts[i].phone+"&content="+encodeURIComponent(content+"【前海云城】"), function(result) {
                        result.on('data', function(d) {
                        });
                        }).on('error', function(e) {
                            console.error("error"+e);
                        });
                    }
                };
                },function(err){
                console.log(err);
                });
                view.render('management/messag');
        }else{
            var q = keystone.list('Households').model.find().where('property',req.user.username).where('area',area).where('building',building);
                q.exec(function(err, results) {
                locals.data.posts=results;
                for (var i=0; i <results.length; i++) {
                    if (locals.data.posts[i].phone!=''||locals.data.posts[i].phone!=undefined) {
                        http.get("http://www.stongnet.com/sdkhttp/sendsms.aspx?reg=101100-WEB-HUAX-244176&pwd=THKMMFPI&sourceadd=&phone="+locals.data.posts[i].phone+"&content="+encodeURIComponent(content+"【前海云城】"), function(result) {
                        result.on('data', function(d) {
                        });
                        }).on('error', function(e) {
                            console.error("error"+e);
                        });
                    }
                };
                },function(err){
                console.log(err);
                });
                view.render('management/home');
        }
    }



    // http.get("http://www.stongnet.com/sdkhttp/sendsms.aspx?reg=101100-WEB-HUAX-244176&pwd=THKMMFPI&sourceadd=&phone=[手机号码]&content=[内容]【前海云城】", function(result) {
    // result.on('data', function(d) {


    // });
    // }).on('error', function(e) {
    //     console.error("error"+e);
    // });

};
