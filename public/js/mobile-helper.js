//页面预加载动画--------开始
//获取浏览器页面可见高度和宽度
var _PageHeight = document.documentElement.clientHeight,
	_PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
	_LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:80;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:0.98;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 97px; line-height: 140px; padding-left: 25px; padding-right: 5px; background:url(/images/newMain/logo.png) no-repeat scroll 50px -15px; border: 0px solid #95B8E7; color: #696969; font-family:\'Microsoft YaHei\';">页面加载中，请等待...</div></div>';
//呈现loading效果
document.write(_LoadingHtml);
document.onreadystatechange = subSomething;
function subSomething() {
if (document.readyState == "complete" ) //当页面加载完毕移除页面遮罩，移除loading动画-
{
	var loadingMask = document.getElementById('loadingDiv');
	loadingMask.parentNode.removeChild(loadingMask);
}
}
//页面预加载动画--------结束

var timeout = null;
var xmlHttp = false;
var json = null;
function createXmlHttp() {
	xmlHttp = false;
	if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
}
// //验证码调用
// onload = function () {
// 	var container1 = document.getElementById("vCode");
// 	var code1 = new vCode(container1);
// 	document.getElementById("submit-6").addEventListener("click", function () {
// 		if(code1.verify($("#code1").val())){
// 			alert('true');
// 		}else{
// 			$('#code1').val('');
// 			alert('false');
// 		}
// 	}, false);
// };
function deleteCoupons(){
	var openid=$('#openids').val();
	var number=$('#user_numbers').val();
	if(window.confirm('确定要删除此优惠券吗?')){
		window.location="deleteCoupons?openid="+openid+"&number="+number;
         return true;
    }else{
         return false;
    }
}
function loadData(element){
	var storeId= $(element).attr('data-storeId');
	var json = $(element).attr('data-post');
	var date = $(element).attr('data-date');
	var address = $(element).attr('data-address');
	var image = $(element).attr('data-image');
	var images = $(element).attr('data-images');
	var imagess = $(element).attr('data-imagess');
	var _id = $(element).attr('data-_id');
	var type = $(element).attr('data-type');
	json = eval('(' + json + ')');
	//console.log(json);
	$('#header').text(json.title);
	$('#title').text(json.title);
	//优惠券显示 ----------开始
	$('#showImage_coupons').attr('src',json.image);
	$('#openids').val(json.openid);
	$('#coupons_title').val(json.title);
	$('#coupons_stores').val(json.store);
	$('#coupons_mark').val(json.mark);
	$('#coupons_type').val(json.type);
	$('#coupons_image').val("/advert/"+image);
	$('#coupons_numbers').val(json.number);
	$('#coupons_store').text("店家:"+json.store);
	$('#coupons_detailss').val(json.details);
	$('#coupons_details').text("详情:"+json.details);
	$('#coupons_contacts').val(json.contact);
	$('#coupons_contact').text("联系方式:"+json.contact);
	$('#coupons_addresss').val(json.address);
	$('#coupons_address').text("地址:"+json.address);
	$('#coupons_validDates').val(json.validDate);
	$('#coupons_validDate').text("有效日期:"+json.validDate);
	$('#coupons_numbers').val(json.number);
	$('#coupons_number').text("券编号:"+json.number);
	$('#user_number').text("券编号:"+json.user_number);
	$('#user_numbers').val(json.user_number);
	//优惠券显示 ----------结束
	$('#publishDate').text("发布日期: "+date);
	$('#content').text(json.content);
	$('#item').text(json.item);
	$('#contact').text(json.contact);
	$('#contact').attr('href', 'tel:' + json.contact);
	$('#address').text("地址: " + address);
	$('#detail').text(json.detail);
	$('#author').text(json.author);
	$('#username').text(json.username);
	$('#image').attr('src', '/advert/' + image);
	$('#showImage').attr('src', '/advert/' + image);
	$('#showImagess').attr('src', '/advert/' + imagess);
	$('#postImage').attr('value', json.image);
	$('#cellphone').text(json.cellphone);
	$('#cellphone').attr('href', 'tel:' + json.cellphone);
	$('#telephone').text(json.telephone);
	$('#telephone').attr('href', 'tel:' + json.telephone);
	$('#qq').text(json.qq);
	$('#address').text(json.address);
	$('#openhr').text(json.openhr);
	$('#use').text(json.use);
	$('#state').val(json.state);
	$('#examine').val(json.examine);
	$('#examine2').text(json.examine);
	//商家赋值
	$('#product').text(json.product);//商品名称
	$('#price').text(json.price+'元');//商品价格
	$('#evalue').text(json.evalue);//商品介绍
	$('#serviceContent').text(json.serviceContent);//服务内容
	$('#datatime').text(date);//时间
	//订单信息赋值
	$('#orderNumber').text(json.orderNumber);//订单号
	$('#orderTime').text(json.orderTime);//下单时间
	$('#pointTime').text(json.pointTime);//预约时间
	$('#serviceContent').text(json.serviceContent);//服务内容
	$('#orderPay').text(json.orderPay);//支付方式
	$('#orderExamine').text(json.orderExamine);//订单状态
	$('#payExamine').text(json.payExamine);//支付状态
	$('#payTime').text(json.payTime);//支付时间
	$('#user').text(json.user);//收货人姓名
	$('#note').text(json.note);//备注
	$('#refuse').text(json.refuse);//取消理由
	$('#pointTime').text(json.pointTime);//预约时间

	$('#number').val(json.orderNumber);//订单号
	$('#confirmId').val(_id);//
	//修改商铺信息
	$("#changestore").attr("href","/business/location/change_Business?storeid=" + json._id+"&_id="+_id);
	$("#publicdel").attr("href","/business/location/deletepost?id=" + json._id+"&type="+type+"&_id="+_id);
	//修改商品信息deleteroduct
	$("#changeproduct").attr("href","/business/location/change_product?productid=" + json._id+"&_id="+_id);
	$("#changecategory").attr("href","/business/location/change_category?categoryid=" + json._id+"&_id="+_id);
	//订单处理
	//$("#confirmOrder").attr("href","/business/location/confirmOrder?orderNumber=" + json.orderNumber+"&_id="+_id);
	$("#friends").attr("href","/business/location/friends?orderNumber=" + json.orderNumber+"&_id="+_id);
	var o = "inline"; 
	if(o=="inline") //根据订单状态显示操作
	{
		if(json.orderExamine == '已处理' || json.orderExamine == '已取消')
		{
			$("#judge").css("display","none");//使之不可见
		}
		else if(json.orderExamine == '处理中'){
			$("#dispose").html("完成订单");
		}
		else{
			$("#judge").css("display","inline"); //使之可见
		}
	}
	createXmlHttp();
	var url = "query_Commodity?title=" + title + "&storeId=" + storeId;
	if (!xmlHttp) {
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			json = JSON.parse(xmlHttp.responseText);
			var n = json.length;
			$("#menu").text("");
			for (var i = 0; i < n; i++) {
				$("#menu").append("商品名称：" + json[i].title + "<br/>商品描述：" + json[i].content + "<br/>原价：" + json[i].originalPrice + "<br/>优惠价：" + json[i].price + "<br/><br/><hr style='border:0;background-color:#AFB2B0;height:1px;'><br/>");
			}
		}
	}
	xmlHttp.send(null);
}
//进入小区选择物业

function changeprovince(province){
	createXmlHttp();
	var obj = document.getElementById('province').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == province){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("citys");
	var url = "loadcity?province="+encodeURIComponent(province);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("citys").options.length = 0;
			document.getElementById("citys").options[0]=new Option("请选择城市",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("citys").options.add(new Option(json[i].city, json[i].city));
			}
		}
	}

xmlHttp.send(null);
}

function changecity(city){
	createXmlHttp();
	var obj = document.getElementById('citys').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == city){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("district");
	var url = "loaddistrict?city="+encodeURIComponent(city);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("district").options.length = 0;
			document.getElementById("district").options[0]=new Option("请选择区",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("district").options.add(new Option(json[i].district, json[i].district));
			}
		}
	}

xmlHttp.send(null);
}

function changeDistrict(district){
	createXmlHttp();
	var obj = document.getElementById('district').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == district){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("property");
	var url = "loadproperty?district="+encodeURIComponent(district);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("property").options.length = 0;
			document.getElementById("property").options[0]=new Option("请选择小区",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("property").options.add(new Option(json[i].username, json[i].username));
			}
		}
	}

xmlHttp.send(null);
}

function changeProperty(property){
	createXmlHttp();
	var obj = document.getElementById('property').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == property){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("area");
	var url = "property_Area?property="+property;
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("area").options.length = 0;
			document.getElementById("area").options[0]=new Option("单元",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("area").options.add(new Option(json[i].area, json[i].area));
			}
		}
	}

xmlHttp.send(null);
}

function changeArea1(area){
	if (window.location.href.indexOf("management")==(-1)) {
		var url = "area_Building?area="+area;
	}else{
		var url = "../mobile/location/area_Building?area="+area;
	}
	createXmlHttp();

	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("building").options.length = 1;
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("building").options.add(new Option(json[i].building, json[i].building));
			}
		}
	}
xmlHttp.send(null);
}

function changeArea(area){
	var area = $("#area").val();
	if (window.location.href.indexOf("management")==(-1)) {
		var url = "area_Building?area="+area;
	}else{
		var url = "../mobile/location/area_Building?area="+area;
	}
	createXmlHttp();

	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("building").options.length = 1;
			json = JSON.parse(xmlHttp.responseText);
			if(area.indexOf("一单元") != (-1)){
				var n=8;
				for (var i = 0; i < n; i++) {
					document.getElementById("building").options.add(new Option((i+1) + "号房", (i+1) + "号房"));
				}
			}
			else{
				var n=6;
				for (var i = 0; i < n; i++) {
				document.getElementById("building").options.add(new Option((i+1) + "号房", (i+1) + "号房"));
				}
			}
		}
	}
xmlHttp.send(null);
}

//商家选择小区
function bProvince(province){ //商家选择省份
	createXmlHttp();
	var obj = document.getElementById('bProvince').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == province){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("bCitys");
	var url = "loadcity?province="+encodeURIComponent(province);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("bCitys").options.length = 0;
			document.getElementById("bCitys").options[0]=new Option("请选择城市",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("bCitys").options.add(new Option(json[i].city, json[i].city));
			}
		}
	}

xmlHttp.send(null);
}

function bCity(city){ //商家选择城市
	createXmlHttp();
	var obj = document.getElementById('bCitys').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == city){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("bDistrict");
	var url = "loaddistrict?city="+encodeURIComponent(city);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("bDistrict").options.length = 0;
			document.getElementById("bDistrict").options[0]=new Option("请选择区",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("bDistrict").options.add(new Option(json[i].district, json[i].district));
			}
		}
	}

xmlHttp.send(null);
}

function bDistrict(district){ //商家选择区
	createXmlHttp();
	var obj = document.getElementById('bDistrict').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == district){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("bProperty");
	var url = "loadproperty?district="+encodeURIComponent(district);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("bProperty").options.length = 0;
			document.getElementById("bProperty").options[0]=new Option("请选择小区",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("bProperty").options.add(new Option(json[i].username, json[i].username));
			}
		}
	}

xmlHttp.send(null);
}

//商家修改个人信息
function editProvince(province){ //商家选择省份
	createXmlHttp();
	var obj = document.getElementById('edit_province').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == province){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("edit_city");
	var url = "loadcity?province="+encodeURIComponent(province);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			myselect.options.length = 0;
			myselect.options[0]=new Option("请选择城市",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				myselect.options.add(new Option(json[i].city, json[i].city));
			}
		}
	}
xmlHttp.send(null);
}

var i=60;
function getCheckNumber(){
	var checkPhoe = /^1\d{10}$/;
	var phoneNumber=$('#phoneNumber').val();
	if (checkPhoe.test(phoneNumber) == false) {
		$("#phonediv").text("* 手机号码格式不正确!");
	}else{
		$("#phonediv").text("");
		var checkNumber=Math.round(900000*Math.random()+100000);
		createXmlHttp();
		$('#check').val(checkNumber);
		$("#getCheck").attr("disabled", true);
		i=60;
		time();
		var url = "checkPhoneNumber?phoneNumber="+phoneNumber+"&checkNumber="+checkNumber;
		if (!xmlHttp){
			alert("XMLHttpRequest is not Create!");
		}
		xmlHttp.open("GET", url, true);
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				if(xmlHttp.responseText[0]=="1"){
                    alert("发送成功，请耐心等待。");
                }else{
                }
			}
		}
	xmlHttp.send(null);
	}
}
//----点击按键显示值倒计时——————开始
var setTime=null;
function time(){
	i-=1;
	$('#getCheck').text(i+"s后可重新发送");
	if(i==59){
		setTime=setInterval("time()",1000)
	}
	if(i==0){
		clearInterval(setTime);
		$("#getCheck").attr("disabled",false);
		$('#getCheck').text("短信验证码");
	}
}
//----结束

function sub(){
	if(window.confirm('确定发送？')){
        document.getElementById('postMessag').submit();
        return true;
    }else{
        return false;
    }
}

function deleteUserCoupons(){
    var num=document.getElementById("number").value;
    var use=document.getElementById("use").value;
    createXmlHttp();
    var url = "doDeleteCoupons?number="+num+"&use="+use;
    if (!xmlHttp){
        alert("XMLHttpRequest is not Create!");
     }
    xmlHttp.open("GET", url, true);

    xmlHttp.onreadystatechange = function(){
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                if(xmlHttp.responseText[0]=="0"){
                    alert("您输入的券编号有误，请核对。");
                }else{
                    alert("此券已成功使用,谢谢使用。");
                }
            }
        }
    xmlHttp.send(null);
    location.reload();
}

//----添加商家验证----
function ss() {
	var author = $("#author").val();
	var contact = $("#contact").val();
	var phone = $("#phone").val();
	var qqnumber = $("#qqnumber").val();
	var address = $("#address").val();
	var merchant = $("#merchant").val();
	var checkNumber = /^1\d{10}$/;
	if (author != "" && contact !="" && phone !="" && checkNumber.test(phone) == true && qqnumber !="" && address !="" && merchant !="" ){
		$("#authordiv").text("");
		$("#contactdiv").text("");
		$("#phonediv").text("");
		$("#qqnumberdiv").text("");
		$("#addressdiv").text("");
		$("#merchantdiv").text("");
		$("#popupBasic").popup("open");
	} else {
		if (author == "") {
			$("#authordiv").text("* 联系人不能为空！");
		} else {
			$("#authordiv").text("");
		}
		if (contact == "") {
			$("#contactdiv").text("* 联系电话不能为空！");
		} else {
			$("#contactdiv").text("");
		}
		if (checkNumber.test(phone) == false) { // || !/^1\d{10}$/(number)
			$("#phonediv").text("* 号码格式不正确！");
		} else {
			$("#phonediv").text("");
		}
		if (qqnumber == "") {
			$("#qqnumberdiv").text("* QQ号码不能为空！");
		} else {
			$("#phonediv").text("");
		}
		if (address == "") {
			$("#addressdiv").text("* 商家地址不能为空！");
		}
		if (merchant == "") {
			$("#merchantdiv").text("* 商家详情不能为空！");
		}
	}
}
//添加订单验证
function orderVerification() {
	var user = $("#user").val();
	var telephone = $("#telephone").val();
	var address = $("#address").val();
	var checkNumber = /^(([2-9]\d{6,7})|(1[3584]\d{9}))$/;
	if (user != "" && telephone !="" && checkNumber.test(telephone) == true && address !=""){
		$("#userdiv").text("");
		$("#telephonediv").text("");
		$("#addressdiv").text("");
		return true;
	} else {
		if (user == "") {
			$("#userdiv").text("* 联系人不能为空！");
			return false;
		} else {
			$("#userdiv").text("");
		}
		if (checkNumber.test(telephone) == false) { // || !/^1\d{10}$/(number)
			$("#telephonediv").text("* 号码格式不正确！");
			return false;
		} else {
			$("#telephonediv").text("");
		}
		if (address == "") {
			$("#addressdiv").text("* 地址不能为空！");
			return false;
		}
		return true;
	}
}
function checkProperty(){
	var property =$("#property").val();
	if(property == "请选择小区"){
		alert("请正确选择小区");
	}else{
		if(window.confirm("确认选择'"+property+"'小区吗？")){
			document.getElementById('doChangeProperty').submit();
			return true;
		}else{
			return false;
		}
	}
}

function businessProperty() { //商家提交小区
  var bProperty = $("#bProperty").val();
  if (bProperty != '请选择小区') {
  	$("#property1").text(bProperty);
  	$("#property").val(bProperty);
  	$("#popupLogin").hide();
  }else{
		alert("请正确选择小区");
	}
}

function repeatBproperty() { //商家二次提交小区
	$("#popupLogin").show();
}

// //判断页面
// function dplays(dp){
// 	var test=$('#property').val();
// 	alert(test);
// 	if(dp == '1'){
//         document.getElementById("property").style.display="none";
//     }
//     if(dp == '2'){
//         $("#property").val("请选择");
//     }
// }

function edit_info(){  //修改个人信息readOnly属性
	$("#edit_submit").show();
}
//商品选择类别
function bcategory(store){
	createXmlHttp();
	var obj = document.getElementById('store').options;
    for (var i = 0; i < obj.length; i ++) {
        if (obj[i].value == store){
        	obj[i].selected = true;
        }
    }
	var myselect=document.getElementById("category");
	var url = "loadStore?store="+encodeURIComponent(store);
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			document.getElementById("category").options.length = 0;
			document.getElementById("category").options[0]=new Option("请选择",'');
			json = JSON.parse(xmlHttp.responseText);
			var n=json.length;
			for (var i = 0; i < n; i++) {
				document.getElementById("category").options.add(new Option(json[i].category, json[i].category));
			}
		}
	}

xmlHttp.send(null);
}
function tishi(){
	alert("此功能正在开发中，敬请期待！");
}

function chkBusiness() { //商家端检验用户名密码
  createXmlHttp();
  var username = $("#email").val();
  var password = $("#password").val();
  var access_token = $("#access_token").val();
  var openid = $("#openid").val();
  if (username != "" && password != "") {
		var url = "loginBusiness?username="+username+"&password="+password;
		if (!xmlHttp){
			alert("XMLHttpRequest is not Create!");
		}
		xmlHttp.open("GET", url, true);
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				var n = xmlHttp.responseText.replace(/\"/g, "");
				if (n == 0){
					alert("请输入正确用户名和密码！");
				}else{
					window.location = "home?_id=" + n + "&access_token="+ access_token + "&openid=" + openid;
				}
			}
		}
  }else{
  	alert("用户名和密码不能为空！");
	}
	xmlHttp.send(null);
}

function orderRefresh(parameter) { //刷新订单
  var _id = parameter;
	window.location = "order?_id=" + _id;
}

function func(element){
	var hehe= $(element).attr('value');
	$('#hehe').val(hehe);
}

//商家端 取消订单 选择其他 显示输入框
function quxiaodingdan(str){
	//var str = $("#refuse").val();//取select下拉值做判断
	if(str == "其它"){
		document.getElementById('refuse_more').style.display='block';
	}
	if(str == "现在不方便服务，不在服务时间，谢谢！" || str == "周末暂停服务，请工作日内再订购！"){
		document.getElementById('refuse_more').style.display='none';
	}
}

//----选择小区验证----
function district() {
  var title = $("#title").val();
  var phone = $("#phoneNumber").val();
  var code = $("#code").val();
  var address = $("#address").val();
  var checkNumber = /^1\d{10}$/;
  if (title != "" && code != "" && phone != "" && checkNumber.test(phone) ==
    true) {
    if ($('#checkNumber').val() == $('#check').val()) {
      $("#titlediv").text("");
      $("#phonediv").text("");
      $("#codediv").text("");
      $("#popupBasic").popup("open");
    } else {
      alert("验证码错误");
    }
  } else {
    if (title == "") {
      $("#titlediv").text("* 姓名不能为空！");
    } else {
      $("#titlediv").text("");
    }
    if (code == "") {
      $("#codediv").text("* 验证码不能为空！");
    }
    if (checkNumber.test(phone) == false) {
      $("#phonediv").text("* 号码格式不正确！");
    } else {
      $("#phonediv").text("");
    }
    if (address == "") {
      $("#phonediv").text("* 地址不能为空！");
    } else {
      $("#phonediv").text("");
    }
  }
}