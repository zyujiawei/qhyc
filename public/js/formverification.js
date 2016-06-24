	//--------------手机页面表单验证-----------------
function test() {
	$("#url").attr('value', document.referrer);
	var title = $("#title").val();
	var item = $("#item").val();
	var location = $("#location").val();
	var author = $("#author").val();
	var content = $("#content").val();
	var number = $("#number").val();
	var checkNumber = /^1\d{10}$/;
	var contact = $("#contact").val();
	if (title != "" && item != "" && location != "" && author != "" && content != "" && checkNumber.test(number) == true) {
		$("#titlediv").text("");
		$("#itemdiv").text("");
		$("#locationdiv").text("");
		$("#authordiv").text("");
		$("#descriptiondiv").text("");
		$("#numberdiv").text("");
		$("#popupBasic").popup("open");
	} else {
		if (title == "") {
			$("#titlediv").text("* 标题不能为空！");
		} else {
			$("#titlediv").text("");
		}
		if (item == "") {
			$("#itemdiv").text("* 项目名不能为空！");
		} else {
			$("#itemdiv").text("");
		}
		if (location == "") {
			$("#locationdiv").text("* 房号不能为空！");
		} else {
			$("#locationdiv").text("");
		}
		if (author == "") {
			$("#authordiv").text("* 姓名不能为空！");
		} else {
			$("#authordiv").text("");
		}
		if (checkNumber.test(number) == false) { // || !/^1\d{10}$/(number)
			$("#numberdiv").text("* 手机号码格式不正确!");
		} else {
			$("#numberdiv").text("");
		}
		if (content == "") {
			$("#descriptiondiv").text("* 内容不能为空！");
		} else {
			$("#descriptiondiv").text("");
		}
	}
}

function checkFeedback() {
	var d = new Date();
	var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	$("#publishedDate").attr('value', str);
	var title = $("#title").val();
	var content = $("#content").val();
	if (title != "" && content != "") {
		$("#url").attr('value', document.referrer);
		$("#titlediv").text("");
		$("#contentdiv").text("");
		$("#popupBasic").popup("open");
	} else {
		if (title == "") {
			$("#titlediv").text("* 标题不能为空！");
		} else {
			$("#titlediv").text("");
		}
		if (content == "") {
			$("#contentdiv").text("* 内容不能为空！");
		} else {
			$("#contentdiv").text("");
		}
	}
}

function on() {
	var d = new Date();
	var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	$("#publishedDate").attr('value', str);
	var title = $("#title").val();
	var author = $("#author").val();
	var number = $("#number").val();
	var content = $("#content").val();
	var contact = $("#contact").val();
	var checkNumber = /^1\d{10}$/;
	if (title != "" && author != "" && content != "" && checkNumber.test(number) == true) { // && /^1\d{10}$/(number)
		$("#url").attr('value', document.referrer);
		$("#titlediv").text("");
		$("#authordiv").text("");
		$("#numberdiv").text("");
		$("#contentdiv").text("");
		$("#popupBasic").popup("open");
	} else {
		if (title == "") {
			$("#titlediv").text("* 标题不能为空！");
		} else {
			$("#titlediv").text("");
		}
		if (author == "") {
			$("#authordiv").text("* 姓名不能为空！");
		} else {
			$("#authordiv").text("");
		}
		if (checkNumber.test(number) == false) { // || !/^1\d{10}$/(number)
			$("#numberdiv").text("* 手机号码格式不正确!");
		} else {
			$("#numberdiv").text("");
		}
		if (content == "") {
			$("#contentdiv").text("* 内容不能为空！");
		} else {
			$("#contentdiv").text("");
		}
	}
}

function verification() {
	var title = $("#title").val();
	var content = $("#content").val();
	var contact = $("#contact").val();
	var address = $("#address").val();
	var rqnumber = $("#rqnumber").val();
	var hdnumber = $("#hdnumber").val();
	var email = $("#email").val();
	if (title != "" && content != "" && contact != "" && address !="" && rqnumber !="" && hdnumber !="" && email !="" && contact.test(number) == true) { // && /^1\d{10}$/(number)
		$("#url").attr('value', document.referrer);
		$("#titlediv").text("");
		$("#authordiv").text("");
		$("#numberdiv").text("");
		$("#contentdiv").text("");
		$("#popupBasic").popup("open");
	} else {
		if (title == "") {
			$("#titlediv").text("* 标题不能为空！");
		} else {
			$("#titlediv").text("");
		}
		if (content == "") {
			$("#contentdiv").text("* 产品类型不能为空！");
		} else {
			$("#contentdiv").text("");
		}
		if (contact.test(number) == false) { // || !/^1\d{10}$/(number)
			$("#contactdiv").text("* 手机号码格式不正确!");
		} else {
			$("#contactdiv").text("");
		}
		if (address == "") {
			$("#addressdiv").text("* 地址不能为空！");
		} else {
			$("#addressdiv").text("");
		}
		if (rqnumber == "") {
			$("#rqnumberdiv").text("* 地址不能为空！");
		} else {
			$("#rqnumberdiv").text("");
		}
		if (hdnumber == "") {
			$("#hdnumberdiv").text("* 地址不能为空！");
		} else {
			$("#hdnumberdiv").text("");
		}
	}
}

//----选择小区验证----
function district() {
	var title = $("#title").val();
	var phone = $("#phoneNumber").val();
	var code = $("#code").val();
	var checkNumber = /^1\d{10}$/;
	if (title != "" && code !="" && phone !="" && checkNumber.test(phone) == true ){
		if ($('#checkNumber').val()==$('#check').val()) {
			$("#titlediv").text("");
			$("#phonediv").text("");
			$("#codediv").text("");
			$("#popupBasic").popup("open");
		}else{
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
	}
}

