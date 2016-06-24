var timeout = null;
var xmlHttp = false;
function createXmlHttp(){
	xmlHttp = false;
	if (window.ActiveXObject) {
		try{xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");}
		catch (e){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
}
function sendRequest(){
	createXmlHttp();
	var url = "../location/mobile_remind";
	if (!xmlHttp){
		alert("XMLHttpRequest is not Create!");
	}
	xmlHttp.open("GET", url+"?openid="+$.session.get('openid'), true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			if(xmlHttp.responseText[0]=="0"){
			}else{
				var json = JSON.parse(xmlHttp.responseText);
				if($('#lostandfoundnum')){
					if(json.statelostandfound != "0"){
						$('#lostandfoundnum').text(json.statelostandfound);
						if(json.statelostandfound > 9){
							$('#lostandfoundnum').css({'padding-left':'1px'});
						}
					}else{
						$('#lostandfoundnum').css({'display':'none'});
					}
				}
				if($('#fixingnum')){
					if(json.statefixing != "0"){
						$('#fixingnum').text(json.statefixing);
						if(json.statefixing > 9){
							$('#fixingnum').css({'padding-left':'1px'});
						}
					}else{
						$('#fixingnum').css({'display':'none'});
					}
				}
				if($('#unread')){
					if(json.statetotal != "0"){
						$('#unread').text(json.statetotal);
						if(json.statetotal > 9){
							$('#unread').css({'padding-left':'1px'});
						}
					}else{
						$('#unread').css({'display':'none'});
					}
				}
			}
		}
	}
	xmlHttp.send(null);
}
sendRequest();
