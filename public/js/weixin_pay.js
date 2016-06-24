function onBridgeReady(xmlData){
    var xmlDoc=null;
    var appId =null;
    var nonceStr =null;
    var pg=null;
    var time=(Date.parse(new Date()))/1000; 
    if (typeof xmlData == "string") {   
        if (document.implementation.createDocument) {  
            var parser = new DOMParser();  
            xmlDoc = parser.parseFromString(xmlData, "text/xml"); 
            appId=xmlDoc.getElementsByTagName("appid")[0].childNodes[0].nodeValue;
            nonceStr=xmlDoc.getElementsByTagName("nonce_str")[0].childNodes[0].nodeValue;
            pg=xmlDoc.getElementsByTagName("prepay_id")[0].childNodes[0].nodeValue;
        } else if (window.ActiveXObject) {  
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
            xmlDoc.async = false;  
            xmlDoc.loadXML(xmlData); 
        }  
    }else {
        xmlDoc = xmlData;
    }
    var info = {
        appId:appId,
        nonceStr:nonceStr,
        package:"prepay_id="+pg,
        signType:"MD5",
        timeStamp: time
    };
    info.sign = getSign(info);
    function getSign(o){
        var base = '';
        for(var key in o){
            base = base+key+'='+o[key]+'&';
        }
        base = base + 'key=qianhaiyunchengqianhaiyunchengqi';
        return hex_md5(base).toUpperCase();
    }
    WeixinJSBridge.invoke('getBrandWCPayRequest',{
        "appId" : appId,     //公众号名称，由商户传入   
        "timeStamp": ""+time, //时间戳，自1970年以来的秒数  
        "nonceStr" : nonceStr, //随机串     
        "package" : "prepay_id=" + pg,   
        "signType" : "MD5",      //微信签名方式:   
        "paySign" : info.sign
        },function(e){
            if(e.err_msg == "get_brand_wcpay_request:ok" ) {
                document.getElementById("form").submit();
            } 
            
        // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
    });
}
function pay(openid,attach,body,total_fee){
    if(orderVerification() == false){
        return false;
    }
    var str = $("#state").val();
    if(total_fee == 'daily' || total_fee == 'depth'){ //根据深度保洁或日常保洁获取页面计算价格
        total_fee = $("#secretPrice").val();
    }
    if(str=="微信支付"){
        if (typeof (WeixinJSBridge) == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            createXmlHttp();
            var url = "weixin_pay?openid=" + openid + "&attach=" + attach + "&body=" + body + "&total_fee=" + total_fee;
            if (!xmlHttp) {
                alert("XMLHttpRequest is not Create!");
            }
            xmlHttp.open("GET", url, true);
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    json = xmlHttp.responseText;
                    onBridgeReady(json);
                }
            }
            xmlHttp.send(null);
            
        }
    }else{
        document.getElementById("form").submit();
    }
    
}