var keystone = require('keystone');
https = require('https');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
  locals.data = {
        access_token: []
  };
  locals.data = {
        openid: []
  }; 
  var code = req.query.code;
  var timeStamp = (new Date()).valueOf();
  https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+keystone.get('business')[0].replace+'&secret='+keystone.get('business')[1].replace+'&code='+code+'&grant_type=authorization_code', function(resultss) {
    resultss.on('data', function(d) {
        var json = JSON.parse(d.toString());
        access_token=json.access_token;
        openid=json.openid;
        locals.data.access_token = access_token;
        locals.data.openid = openid;
			  var q = keystone.list('LoginCheck').model.find().where('openid',openid).sort('-loginTime');
				q.exec(function(err, results) {
					if(results[0] != null){
						if(timeStamp - results[0].loginTime <= 1000 * 60 * 60){
							res.redirect('/business/location/home?_id=' + results[0].businessId + "&access_token="+ access_token + "&openid=" + openid); //跳转主页
						}
						else
							view.render('business/services/loginBusiness');
					}
					else{
						view.render('business/services/loginBusiness');
					}
					//res.send(results[0]);
				},function(err){
				console.log(err);
				});
			});
    }).on('error', function(e) {
   });
};