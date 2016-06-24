var keystone = require('keystone'),
https = require('https'),
fs = require('fs'),
xml2js = require('xml2js'),
md5 = require('md5'),
dom = require('xmldom');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    locals = res.locals;
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
        appid:keystone.get('weixin')[0].replace,//微信公众号
        mch_id:keystone.get('mch_id')[0].replace,//商户号
        nonce_str: nonce_str,//随机支付串
        out_trade_no:"1450082615753",
        out_refund_no:"1043780820151241231290614512312312",
        refund_fee:"0.01",//退款金额
        total_fee: "0.02",//总金额
        op_user_id:keystone.get('mch_id')[0].replace //操作员帐号, 默认为商户号
    };
    info.sign = getSign(info);

    var options = {
         pfx: fs.readFileSync('apiclient_cert.pem'),/*服务器证书*/
         passphrase:'1260594501',/*服务器证书的口令*/
         //ca: fs.readFileSync(__dirname+'/cert/root.cer'),/*根证书*/
         requestCert: false/*请求客户端证书*/
    };
    console.log(options);
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
                    path: '/secapi/pay/refund',
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/xml',
                        }
                    };
    var list=[];
    var post_req = https.request(options, function(res){
        res.on('data', function(buffer){
            list.push(buffer);
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
};
