var _appPathName = "/lfc";
var _errorPrompt = "非常抱歉，请检查网络、或者询问管理员。";

function getLocationContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0, index + 1);
    if ("/resources" == result)
        result = "";
    return result;
}

var _cxtPath = getLocationContextPath();
var _appPath = _cxtPath + _appPathName; 
var _resPath = _cxtPath + "/resources";

function toRootIndex(){
	clearGlobalSettingsCkey();
	if(_cxtPath == "")
		document.location = "/login";
	else
		document.location = _cxtPath;
}

function checkUrl4AppPath(url){
	if(url.indexOf(_appPath) != 0 && url.indexOf("/") == 0 && url.indexOf(_resPath) != 0 ) {
		return _appPath + url; 
	}
	return url;
}

function isResponseErrcode(resData){
	return resData.appid && resData.errcode;
}

function alertError(msg){
	bootbox.dialog({
		title : '出错了',
		message : msg.msg,
		buttons : {
			success : {
				label : "知道了!",
				className : "btn-success",
				callback:function(){
					if(msg.callback())
						msg.callback()
				}
			}
		}
	});
}

function alertSucc(msg){
	bootbox.dialog({
		title : '提交成功',
		message : msg,
		buttons : {
			success : {
				label : "知道了!",
				className : "btn-success"
			}
		}
	});
}

function doResponseErrcode(resData){
    console.info(resData);
	if(resData.errcode < 0){
		alertError(resData.errmsg);
	}else if(resData.errcode == 401){
        alertError({msg:'您还没有登录或登录失效，请重新登录！',callback:function(){
			toRootIndex();
		}});
	} else {			
		alertError(_errorPrompt);
	}
}

var _globalSettings = {};

function secureRequired(s){
	if(_globalSettings.des === 'none')
		return false;
	if(_globalSettings.des === 'ckey')
		return true;
	return 'true' === s || true === s; 
}


var _secureKey = 0;
$.ajaxSetup({
	async : false,
	dataFilter: function (data, type) {
		if(!data)
			return data;

        if (type && type == 'script')
            return data;

		var isStr = typeof data === "string";
		var resData = isStr ? JSON.parse(data) : data;
		if(isResponseErrcode(resData)){
			doResponseErrcode(resData);
    		return data;
    	}
		if(_secureKey && resData.encrypt){
			return decryptResponse(_secureKey, resData, true);
		}
		return data;
	},
	beforeSend: function (xhr, settings) {
		checkGlobalSettingsUser();
    	settings.url = checkUrl4AppPath(settings.url);
    	var requestCrypt = false;
    	var responseCrypt = false;
    	if(secureRequired(settings.secure)){
    		responseCrypt = true;
    		requestCrypt = settings.contentType == "application/json";
    	}
		xhr.setRequestHeader('Encrypt-Requ', requestCrypt);
		xhr.setRequestHeader('Encrypt-Resp', responseCrypt);
		var secureData = encryptRequest(settings.data, requestCrypt, responseCrypt); 
		_secureKey = secureData.keys;
		settings.data = secureData.data;
		if(secureData.headers.encrypt_key)
			xhr.setRequestHeader('Encrypt-Key', secureData.headers.encrypt_key);
		if(secureData.headers.encrypt_iv)
			xhr.setRequestHeader('Encrypt-Iv', secureData.headers.encrypt_iv);
		if(secureData.headers.encrypt_u)
			xhr.setRequestHeader('Encrypt-U', secureData.headers.encrypt_u);			
	}
});

$.ajax({
	secure : false,
	type:'GET',
	url : _appPath +  "/home/user/settings",
	success : function(result) {
		_globalSettings = result;
		if(result.systime){
			_globalSettings.systime = new Date(); 
			_globalSettings.systime.setTime(result.systime);
		}
		if(result.n && result.e) {
			_globalSettings.jsbnRSAKey = new RSAKey();
			_globalSettings.jsbnRSAKey.setPublic(result.n, result.e); // _jsbnRSAKey
		}
	},
    error: function(info, strStatus, strObject){
    	alertError(_errorPrompt);
    }
});

function clearGlobalSettingsCkey(){
	window.localStorage.removeItem("_globalSettings.ckey");
}

function getGlobalSettingsCkey(){
	return window.localStorage.getItem("_globalSettings.ckey");
}

function setGlobalSettingsCkey(){
	var ckey =  window.localStorage.getItem("_globalSettings.ckey");
	if(ckey)
		return;
	$.ajax({
    	secure: true,
		dataType: 'json',
		contentType: "application/json",
		url : "/sign/user/ckey",
		success : function(result) {
			window.localStorage.setItem("_globalSettings.ckey", result.ckey);
		}
	});
}

var _globalSettingsUser = null;
function getGlobalSettingsUser(){
	_globalSettingsUser = null;
	$.ajax({
    	secure: true,
		dataType: 'json',
		contentType: "application/json",
		url : "/sign/user/getUser",
		success : function(result) {
			_globalSettingsUser = result;
		}
	}); 
	return _globalSettingsUser;
}

function checkGlobalSettingsUser(){
	var ckey =  getGlobalSettingsCkey();
	if(ckey && _globalSettingsUser && !new RegExp(_globalSettingsUser.id + "$").test(ckey)){
		bootbox.alert(
			"已更换用户，将关闭当前窗口，请另开新窗口进行操作。", 
			function(){ window.close(); }
		);
	}
}

function encryptRequest(requestData, requestCrypt, responseCrypt){
	var strKey = "", strIv = "", possible = "0123456789abcdef";
	for( var i=0; i < 32; i++ ){
		strKey += possible.charAt(Math.floor(Math.random() * 16));
		strIv += possible.charAt(Math.floor(Math.random() * 16));
	}
	var encrypted = { keys : 0, headers:{} }; // data headers keys
	var ckey =  getGlobalSettingsCkey();
	if(ckey){
		encrypted.headers = {
			encrypt_key: strKey,
			encrypt_iv: strIv,
			encrypt_u: CryptoJS.MD5(strKey + strIv + ckey).toString(CryptoJS.enc.Base64)
		};
		if(requestCrypt || responseCrypt){
			encrypted.keys = {
				key : CryptoJS.MD5(strKey + ckey),
				iv : CryptoJS.MD5(strIv + ckey)
			};
		}
	} else if(requestCrypt || responseCrypt) {
		encrypted.headers = {
			encrypt_key: hex2b64(_globalSettings.jsbnRSAKey.encrypt(strKey)),
			encrypt_iv: hex2b64(_globalSettings.jsbnRSAKey.encrypt(strIv))
		};
		encrypted.keys = {
			key : CryptoJS.enc.Hex.parse(strKey),
			iv : CryptoJS.enc.Hex.parse(strIv)
		};
	}
	if(requestCrypt && requestData != null && requestData != "") { 
		var isObject = typeof requestData === 'object';
		var data = isObject ? JSON.stringify(requestData) : "" + requestData;
		data = CryptoJS.AES.encrypt(data, encrypted.keys.key, { iv: encrypted.keys.iv }); 
		var dataObj = {
			encrypt: data.ciphertext.toString(CryptoJS.enc.Base64)
		};
		encrypted.data = isObject ? dataObj : JSON.stringify(dataObj);
	} else {
		encrypted.data = requestData;
	}
	return encrypted;
}

function decryptResponse(secureKey, jsonData, resultIsStr){
	if(!secureKey || jsonData == null || !jsonData.encrypt)
		return jsonData;
	var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(jsonData.encrypt)
    });
	var decrypted = CryptoJS.AES.decrypt(cipherParams, secureKey.key, { iv: secureKey.iv });    			
	var data = decrypted.toString(CryptoJS.enc.Utf8);
	return resultIsStr ? data : JSON.parse(data);
}