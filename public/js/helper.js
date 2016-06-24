$(document).ready(function() {

  $('ul.nav > li').click(function(e) {
    //e.preventDefault();
    $('ul.nav > li').removeClass('active');
    $(this).addClass('active');
  });

  if ($(".form_datetime")) {
    $(".form_datetime").datetimepicker({
      format: "yyyy/mm/dd",
      autoclose: true,
      todayBtn: true,
      pickerPosition: "bottom-right",
      language: "zh-CN",
      minView: 2
    });
  }
  ;


  //隐藏提示框
  $("#responseText").hide();

  var options = {
    //target: '#responseText',					//把服务器返回的内容放入id为output的元素中
    beforeSubmit: showRequest, //提交前的回调函数
    success: showResponse, //提交后的回调函数
  //url: url,								 //默认是form的action， 如果申明，则会覆盖
  //type: type,							 //默认是form的method（get or post），如果申明，则会覆盖
  //dataType: null,					 //html(默认), xml, script, json...接受服务端返回的类型
  //clearForm: true,					//成功提交后，清除所有表单元素的值
  //resetForm: true,					//成功提交后，重置所有表单元素的值
  };
  timeout: 3000 //限制请求的时间，当请求大于3秒后，跳出请求

  var deleteOptions = {
    //target: '#responseText',					//把服务器返回的内容放入id为output的元素中
    //beforeSubmit: showRequest,	//提交前的回调函数
    success: showResponse, //提交后的回调函数
    //url: url,								 //默认是form的action， 如果申明，则会覆盖
    //type: type,							 //默认是form的method（get or post），如果申明，则会覆盖
    //dataType: null,					 //html(默认), xml, script, json...接受服务端返回的类型
    //clearForm: true,					//成功提交后，清除所有表单元素的值
    //resetForm: true,					//成功提交后，重置所有表单元素的值
    timeout: 3000 //限制请求的时间，当请求大于3秒后，跳出请求
  };

  function showRequest(formData, jqForm, options) {
    //formData: 数组对象，提交表单时，Form插件会以Ajax方式自动提交这些数据，格式如：[{name:user,value:val },{name:pwd,value:pwd}]
    //jqForm:	 jQuery对象，封装了表单的元素
    //options:	options对象
    var index = window.location.pathname.indexOf("contact");
    if (index == (-1)) {
      var title = $("#title").val();
      if (window.location.pathname.indexOf("fixing") == (-1)) {
        if (title != "") {
          $("#responseText").show().removeClass("alert alert-danger");
          return true;
        } else {
          $("#responseText").show().addClass("alert alert-danger");
          $("#responseText").text("标题不能为空！");
          return false;
        }
      }
    } else {
      var title = $("#title").val();
      var contact = $("#contact").val();
      if (title == "" && contact == "") {
        $("#responseText").show().addClass("alert alert-danger");
        $("#responseText").text("标题和联系电话不能为空！");
        return false;
      } else if (title == "") {
        $("#responseText").show().addClass("alert alert-danger");
        $("#responseText").text("标题不能为空！");
        return false;
      } else if (contact == "") {
        $("#responseText").show().addClass("alert alert-danger");
        $("#responseText").text("联系电话不能为空！");
        return false;
      } else {
        $("#responseText").show().removeClass("alert alert-danger");
        return true;
      }
    }
  }
  ;


  function showResponse(responseText, statusText) {
    if (statusText == "success") {
      $("#responseText").show().addClass("alert-success");
      $("#responseText").text("保存成功");
    } else {
      $("#responseText").show().addClass("alert alert-danger");
      $("#responseText").text("保存失败");
    }
  }
  ;
  //----------------------------------------------------------------------------

  $(".enableEdit").click(function() {
    $(".fieldset").removeAttr("disabled");
  });

  //保存按钮点击事件
  $("#savebutton").click(function() {
    $("#newpost").ajaxSubmit(options);
    $('#newItem').modal("toggle");
    $('#newItems').modal("toggle");
    return false; //阻止表单默认提交
  });

  //保存按钮点击事件
  // $("#surebutton").click(function() {
  //   $("#dochangpassword").ajaxSubmit(options);
  //   return false; //阻止表单默认提交
  // });

  //关闭修改的窗口后需要重置表单
  $(".closepost").click(function() {
    //重置表格
    $("#responseText").hide().removeClass("alert-success");
    $("#newormodify").val("new");
  });

  $('#newItem').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var data = button.data('json'); // Extract info from data-* attributes
    if (data != undefined) {
      var modal = $(this);
      var attributes = [];
      modal.find('.modal-title').text("修改");
      modal.find('.modal-body input').each(function() {
        var inputname = this.name;
        attributes.push(inputname);
      });

      modal.find('.modal-body textarea').each(function() {
        var inputname = this.name;
        attributes.push(inputname);
      });

      $.each(data, function(i, val) {
        if (existInList(attributes, i)) {
          modal.find('[name=' + i + ']').val(val);
        }
        modal.find('[name=newormodify]').val('modify');
      });
    }
  });

  // $('#newItem').on('show.bs.modal', function(event) {
  //   var button = $(event.relatedTarget); // Button that triggered the modal
  //   var data = button.data('json'); // Extract info from data-* attributes
  // });

  $('#newItem').on('hidden.bs.modal', function(event) {
    $("#newpost").resetForm();
    location.reload();
  });


  //---------------------------------------------------------------------------

  $('#deleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var id = button.data('id'); // Extract info from data-* attributes
    id = id.replace(/"/g, "");
    var type = button.data('type');
    $('#delete').attr("action", "/management/deletepost?id=" + id + "&type=" +
      type);
  });

  $("#deleteModalButton").click(function() {
    $("#delete").ajaxSubmit(deleteOptions);
    $('#deleteModal').modal("toggle");
    return false; //阻止表单默认提交
  });



  $('#deleteModal').on('hidden.bs.modal', function(event) {
    location.reload();
  });

  $('.deletepost').hover(function(e) {
    $('.tablerow').removeAttr("data-target");
  }, function(e) {
    $('.tablerow').attr("data-target", "#newItem")
  });
  //防止删除帖子时弹出modal

  //更改物业管理后台白色模块高度
  //window.onload = resizeWhiteBlock();

});


//-------------------------------------------
function existInList(list, name) {
  for (var i in list) {
    //alert("item is "+list[i]+" where "+name);
    if (list[i] == name) {
      return true
    }
  }
  return false;
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
  if (title != "" && author != "" && content != "" && checkNumber.test(number) ==
    true) { // && /^1\d{10}$/(number)
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
  if (title != "" && content != "" && contact != "" && address != "" && rqnumber !=
    "" && hdnumber != "" && email != "" && contact.test(number) == true) { // && /^1\d{10}$/(number)
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
//图片预览----开始
function previewImage(file) {
  var img = document.getElementById('images').value;
  if (img == "") {
    document.getElementById('image').style.display = "none";
  } else {
    document.getElementById('image').style.display = "block";
  }
  var MAXWIDTH = 260;
  var MAXHEIGHT = 180;
  var div = document.getElementById('preview');
  if (file.files && file.files[0]) {
    var img = document.getElementById('image');
    img.onload = function() {
      var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
      img.width = rect.width;
      img.height = rect.height;
      img.style.marginLeft = rect.left + 'px';
      img.style.marginTop = rect.top + 'px';
    }
    var reader = new FileReader();
    reader.onload = function(evt) {
      img.src = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
  } else {
    var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    file.select();
    var src = document.selection.createRange().text;
    div.innerHTML = 'img(id=image)';
    var img = document.getElementById('image');
    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' +
      rect.height);
    div.innerHTML = "div(id=divhead style='width:" + rect.width + "px;height:" +
      rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + ")";
  }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
  var param = {
    top: 0,
    left: 0,
    width: width,
    height: height
  };
  if (width > maxWidth || height > maxHeight) {
    rateWidth = width / maxWidth;
    rateHeight = height / maxHeight;
    if (rateWidth > rateHeight) {
      param.width = maxWidth;
      param.height = Math.round(height / rateWidth);
    } else {
      param.width = Math.round(width / rateHeight);
      param.height = maxHeight;
    }
  }

  param.left = Math.round((maxWidth - param.width) / 2);
  param.top = Math.round((maxHeight - param.height) / 2);
  return param;
}




function resizeWhiteBlock() {
  var height = window.innerHeight;
  if ($("#page-wrapper").height() < height) {
    $("#page-wrapper").css("height", height);
  }
}

function chkPassword() { //检验密码
  var newpassword = $("#newpassword").val();
  var confirmpassword = $("#confirmpassword").val();
  var chkPassword = /^(\w){6,8}$/;
  if (chkPassword.test(newpassword) == true && chkPassword.test(confirmpassword) == true) {
    if (newpassword != confirmpassword) {
      alert("两次密码不一样，请重新输入！");
      return false;
    } else {
      $("#dochangpassword").submit();
      alert("密码修改成功，下次登录请使用新密码！");
    }
  } else {
    if (chkPassword.test(newpassword) == false) {
      alert("请输入6-8位数不含特殊字符的新密码");
      return false;
    }
    if (chkPassword.test(confirmpassword) == false) {
      alert("请输入6-8位数不含特殊字符的确认新密码");
      return false;
    }
  }
}
