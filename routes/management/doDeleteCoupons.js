var keystone = require('keystone'),

exports = module.exports = function(req, res) {
    var number = req.query.number;
    var use = req.query.use;
    console.log(use);
    var id=null;
    user_Coupons = keystone.list('user_Coupons');
    var q = keystone.list('user_Coupons').model.find().where('user_number',number);
        q.exec(function(err, results) {
        if(results==""){
            res.send("0");
        }else{
            id=results[0].id;
            results[0].state='已使用';
            results[0].use=use;
            results[0].save(function(err) { 
            });
            res.send("1");
        }
        },function(err){
        console.log(err);
        });
};

    