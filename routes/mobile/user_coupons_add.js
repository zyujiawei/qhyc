var keystone = require('keystone');
exports = module.exports = function(req, res) {
var view = new keystone.View(req, res),
locals = res.locals;
locals.section = 'coupons_type';
locals.data = {
    type: []
};
locals.data = {
    remind: []
};
var q = keystone.list('user_Coupons').model.find().where('openid',req.body.coupons_openid).where('number',req.body.coupons_numbers);
        q.exec(function(err, result) {
            if (result=="") {
                var q = keystone.list('Coupons_type').model.find();
                    q.exec(function(err, results) {
                    locals.data.type=results;
                    user_Coupons = keystone.list('user_Coupons');
                    var numbers=req.body.coupons_mark+Math.round(90000000*Math.random()+10000000);
                    var newPost = new user_Coupons.model({
                        title: req.body.coupons_title,//这里取的是name
                        store: req.body.coupons_stores,
                        contact: req.body.coupons_contacts,
                        address: req.body.coupons_addresss,
                        number: req.body.coupons_numbers,
                        details: req.body.coupons_detailss,
                        image: req.body.coupons_image,
                        user_number: numbers,
                        type: locals.data.type[0].title,
                        validDate: req.body.coupons_validDates,
                        openid: req.body.coupons_openid,
                        state:'未使用'
                    });
                    newPost.save(function(err) {
                    res.redirect('mobile/'+encodeURIComponent(req.params.property)+'/home');
                    });
                    },function(err){
                    console.log(err);
                    });

            } else {
                locals.data.remind="您已经领取该优惠券，请勿重复领取。";
                view.render('mobile/services/remindUser');
            };
        });



};
