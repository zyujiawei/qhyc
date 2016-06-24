var keystone = require('keystone'),
https = require('https'),
xml2js = require('xml2js');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    locals = res.locals;
    locals.data = {
        parame: []
    };
    //post json
    var timestamp = (new Date()).valueOf();
    var ip=(req.connection.remoteAddress).substring(7);
    console.log(ip+"------IP地址");
    console.log(timestamp+"--------时间戳");
    var postData ={
        appid:"wx060557874cef155e",
        attach:"附加数据_test",
        body:"测试购买支付_test",
        mch_id:"1260594501",
        nonce_str:"5K8264ILTKCH5S8Q2502SI8ZNMTM67VS",
        notify_url:"http://www.szqhyc.com/mobile/location/wxnotify",
        openid:"ocPe-viXNHp447wJxtVe39krt29M",
        out_trade_no:"1448004353835",
        spbill_create_ip:"10.173.179.32",
        total_fee:"1",
        trade_type:"JSAPI",
        sign:"631465619270B6E6AA6E634290EFADC0"
    };
    var builder = new xml2js.Builder();
    var parser = new xml2js.Parser(); 
    // console.log(postData+"------------postData________1");
    // postData = JSON.stringify(postData);//将json对象转换成json对符串 
    // console.log(postData+"------------postData________2");
    var xmlData;
    xmlData =builder.buildObject(postData);
    var options = {
                    hostname: 'api.mch.weixin.qq.com',
                    port: 443,
                    path: '/pay/unifiedorder',
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/xml',
                        }
                    };
    var post_req = https.request(options, function(res){
        res.on('data', function(buffer){
            console.log(buffer.toString());
            locals.data.parame=buffer;
            view.render('mobile/services/test_pay');
        });
        res.on('end', function() {
            console.log('No more data in response.')
        })
    });
    post_req.on('error', function(e) {
        console.log('problem with request: ' + e.message);//打印错误信息
    });
    // write data to request body
    post_req.write(xmlData+"\n");//写入post数据
    post_req.end();

};
