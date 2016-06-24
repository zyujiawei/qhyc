var keystone = require('keystone'),
https = require('https'),
xml2js = require('xml2js'),
md5 = require('md5'),
dom = require('xmldom');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    locals = res.locals;
    locals.data = {
        parame: []
    };
    //post json
    var openid=req.query.openid;//用户openid
    var attach = req.query.attach;//附加介绍描述
    var body = req.query.body;//商品支付简要描述
    var total_fee = req.query.total_fee*100;//价格

//查询首次订单
var q = keystone.list('Order').model.find().where('userId',openid).count().exec().then(function(oResults) {
    if(oResults == 0){
        //如是首单 减十元
    	total_fee = total_fee-1000;
    }
    pay();
    
},function(err){
			console.log(err);
	});
function pay(){
    //获取时间戳
    var timestamp = (new Date()).valueOf();
    //获取用户端IP
    var ip=(req.connection.remoteAddress).substring(7);

    //生成32位随机字符
    function randomWord(randomFlag, min, max){
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
     
        // 随机产生
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    }
    var nonce_str=randomWord(false, 32).toUpperCase();
    var info = {
        appid:keystone.get('weixin')[0].replace,
        attach:attach,
        body: body,
        mch_id:keystone.get('mch_id')[0].replace,
        nonce_str: nonce_str,
        notify_url:"http://"+keystone.get('link')[0].replace+"/mobile/location/wxnotify",
        openid:openid,
        out_trade_no: timestamp,
        spbill_create_ip: ip,
        total_fee: total_fee,
        trade_type:'JSAPI'
    };
    info.sign = getSign(info);
    function getSign(o){
        var base = '';
        for(var key in o){
            base = base+key+'='+o[key]+'&';
        }
        base = base + 'key=qianhaiyunchengqianhaiyunchengqi';
        return md5(base).toUpperCase();
    }
    var builder = new xml2js.Builder();
    var parser = new xml2js.Parser(); 
    var DOMParser=dom.DOMParser;
    var xmlData;
    var str1=null;
    xmlData =builder.buildObject(info);
    var options = {
                    hostname: 'api.mch.weixin.qq.com',
                    port: 443,
                    path: '/pay/unifiedorder',
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/xml',
                        }
                    };
    var list=[];
    var post_req = https.request(options, function(res){
        res.on('data', function(buffer){
            list.push(buffer);
            locals.data.parame=buffer;
            //view.render('mobile/services/test_pay');
        });
        res.on('end',function() {
            str1=Buffer.concat(list).toString();
            console.log(str1);
            sendData(str1);
        })
    });
    function sendData(data){
        res.send(data);
    }
    post_req.on('error', function(e) {
        console.log('problem with request: ' + e.message);//打印错误信息
    });
    // write data to request body
    post_req.write(xmlData+"\n");//写入post数据
    post_req.end();
}
};
