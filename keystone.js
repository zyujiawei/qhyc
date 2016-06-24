// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var sio = require('socket.io');
var https = require('https');
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'yuncheng',
	'brand': 'yuncheng',
	'port': 10000,
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	'mongo': 'mongodb://@localhost/home',
	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'signin redirect': '/management/home',
	'signout redirect': '/',
	'user model': 'User',
	'cookie secret': 'S*T[.q_J@6}d6DsRnCB<tynwE$6dCH@cZ"yh{{+i!i#tH+da+TdBH^An4d]I@zgw'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
  logo_src: '/images/logo-email.gif',
  logo_width: 194,
  logo_height: 76,
  theme: {
    email_bg: '#f9f9f9',
    link_color: '#2697de',
    buttons: {
      color: '#fff',
      background_color: '#2697de',
      border_color: '#1a7cb7'
    }
  }
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.
// keystone.set('email rules', [{
// 	find: '/images/',
// 	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
// }, {
// 	find: '/keystone/',
// 	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
// }]);

keystone.set('weixin', [{
  find: 'AppID',
  replace: (keystone.get('env') == 'production') ? 'wx060557874cef155e' : 'wx7b569821a51d47ce'
}, {
  find: 'AppSecret',
  replace: (keystone.get('env') == 'production') ?
    'e9a989f3f9c7e2c63f76ea3f2e6f47c2' : 'c6e874b467aae66ce9d342a7591cd615'
}]);
keystone.set('link', [{
  find: 'www',
  replace: (keystone.get('env') == 'production') ? 'www.szqhyc.com' : 'www.szqhyc.com%3a10000'
}]);
keystone.set('business', [{
  find: 'AppID',
  replace: (keystone.get('env') == 'production') ? 'wxd5a37e2ee2d7b1c0' : 'wx249734dedde88612'
}, {
  find: 'AppSecret',
  replace: (keystone.get('env') == 'production') ?
    '5656bb63e98d72569d511697db195fbe' : 'adffa35a0390482bd968198ec3448fcb'
}]);
keystone.set('mch_id', [{
  find: 'number',
  replace: (keystone.get('env') == 'production') ? '1272906001' : '1260594501'
}]);
// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
  '通知公告': 'bulletins',
  '失物招领': 'lostandfounds',
  '故障报修': 'fixings',
  '投诉建议': 'complaints',
  '联系物业': 'contacts',
  '配套设施': 'facilities',
  '周边商家': 'stores',
  '小区账号管理': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start({
  onHttpServerCreated: function() {
    https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+keystone.get('weixin')[0].replace+'&secret='+keystone.get('weixin')[1].replace, function(res) {
    res.on('data', function(d) {
      var json = JSON.parse(d.toString());
      token = keystone.list('Token');
      token.model.remove(function(err) {
          // 删除数据库中原有的token
      });
      var newPost = new token.model({
        content: json.access_token,
      });
      newPost.save(function(err) {
      //插入最新token
    });
    });
  }).on('error', function(e) {
    console.error("error"+e);
  });  
  https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+keystone.get('business')[0].replace+'&secret='+keystone.get('business')[1].replace, function(res) {
    res.on('data', function(d) {
      var json = JSON.parse(d.toString());
      businessToken = keystone.list('BusinessToken');
      businessToken.model.remove(function(err) {
          // 删除数据库中原有的token
      });
      var newPost = new businessToken.model({
        content: json.access_token,
      });
      newPost.save(function(err) {
      //插入最新token
    });
    });
  }).on('error', function(e) {
    console.error("error"+e);
  });
    var server = keystone.httpServer;
    var io = sio.listen(server);

    keystone.set('io', io);
    io.on('connection', function(socket) {
      socket.on('display', function(data) {
        var q = keystone.list('User').model.find().where('username', data.property)
          .exec().then(function(result) {
          q = keystone.list('Temporary').model.find().where('type', '失物招领')
            .where('property', result[0]._id).count();
          q.exec(function(err, results) {
            socket.remindlostandfound = results;
            socket.emit('' + result[0].username + 'remindlostandfound', {
              remindlostandfound: socket.remindlostandfound
            });
            socket.broadcast.emit('' + result[0].username +
              'remindlostandfound', {
                remindlostandfound: socket.remindlostandfound
              });
          });
        }, function(err) {
          console.log(err);
        });
        var q2 = keystone.list('User').model.find().where('username', data.property)
          .exec().then(function(result) {
          q2 = keystone.list('Temporary').model.find().where('type', '投诉建议')
            .where('property', result[0]._id).count();
          q2.exec(function(err, results2) {
            socket.remindcomplaint = results2;
            socket.emit('' + result[0].username + 'remindcomplaint', {
              remindcomplaint: socket.remindcomplaint
            });
            socket.broadcast.emit('' + result[0].username +
              'remindcomplaint', {
                remindcomplaint: socket.remindcomplaint
              });
          });
        }, function(err) {
          console.log(err);
        });
        var q3 = keystone.list('User').model.find().where('username', data.property)
          .exec().then(function(result) {
          q3 = keystone.list('Temporary').model.find().where('type', '故障报修')
            .where('property', result[0]._id).count();
          q3.exec(function(err, results3) {
            socket.remindfixing = results3;
            socket.emit('' + result[0].username + 'remindfixing', {
              remindfixing: socket.remindfixing
            });
            socket.broadcast.emit('' + result[0].username + 'remindfixing', {
              remindfixing: socket.remindfixing
            });
          });
        }, function(err) {
          console.log(err);
        });
        var q5 = keystone.list('User').model.find().where('username', data.property)
          .exec().then(function(result) {
          q5 = keystone.list('Temporary').model.find().where('type', '业务办理')
            .where('property', result[0]._id).count();
          q5.exec(function(err, results5) {
            socket.remindbusiness = results5;
            socket.emit('' + result[0].username + 'remindbusiness', {
              remindbusiness: socket.remindbusiness
            });
            socket.broadcast.emit('' + result[0].username +
              'remindbusiness', {
                remindbusiness: socket.remindbusiness
              });
          });
        }, function(err) {
          console.log(err);
        });
        var q4 = keystone.list('User').model.find().where('username', data.property)
          .exec().then(function(result) {
          q4 = keystone.list('Temporary').model.find().where('property',
            result[0]._id).count();
          q4.exec(function(err, results4) {
            socket.remindtotal = results4;
            socket.emit('' + result[0].username + 'remindtotal', {
              remindtotal: socket.remindtotal
            });
            socket.broadcast.emit('' + result[0].username + 'remindtotal', {
              remindtotal: socket.remindtotal
            });
          });
        }, function(err) {
          console.log(err);
        });
      });
      socket.on('disconnect', function() {});

    });
  }
});
