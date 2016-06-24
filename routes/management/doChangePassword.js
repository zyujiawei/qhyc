var keystone = require('keystone'),
  http = require('http');
exports = module.exports = function(req, res) {
  var locals = res.locals;
  locals.data = {
    flag: []
  };
  locals.user = req.user;
  var newpassword = req.body.newpassword;
  var q = keystone.list('User').model.find().where('_id', locals.user._id);
  q.exec(function(err, result) {
    result[0].password = newpassword;
    result[0].save(function(err) {
      console.log('saveErr' + err);
      locals.data.flag = 0;
    });
    locals.data.flag = 1;
    res.redirect('/management/home');
  });
};
