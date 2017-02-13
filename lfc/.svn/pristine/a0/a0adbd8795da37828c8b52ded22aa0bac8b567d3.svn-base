function getLocationQueryParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var search = window.location.search;
	if (search == null || search == '') {
		search = window.location.href.substr(window.location.href.indexOf('?'));
	}
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
			.exec(search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g,
			" "));
}
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth()+1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
function formatObjectArray(val, name) {
	if (val.length == 0)
		return '';
	var result = val[0][name];
	for (var i = 1; i < val.length; ++i) {
		result += ',' + val[i][name];
	}
	return result;
}


function doStrFunction(strFunction, data) {
	if (strFunction)
		strFunction = strFunction.replace(/(-)/g, '_');
	if (window[strFunction] && (typeof (window[strFunction]) == 'function')) {
		try {
			window[strFunction](data);
		} catch (e) {
			console.log('doStrFunction exception: ' + e);
		}
	}
}

function doCallbackFunction(callbacks, arg) {
	if (callbacks) {
		if($.isFunction(callbacks)){
			if(callbacks.length == 0){
				callbacks();
			} else {
				callbacks(arg);
			}
		} else {
			for (var p in callbacks) {
				if (typeof (callbacks[p]) == "function") {
					if(callbacks[p].length == 0){
						callbacks[p]();
					} else {
						callbacks[p](arg);
					}
				}
			}			
		}
	}
}

function parseDataOptions($element) {
	var strOptions = $element.attr('data-options');
	if (!strOptions)
		return null;
	if (strOptions.substring(0, 1) != "{") {
		strOptions = "{" + strOptions + "}";
	}
	return (new Function("return " + strOptions))();
}

function convertToStrSqlDate(date) {
	var strDate = date.getFullYear();
	var m = date.getMonth() + 1;
	strDate += (m < 10 ? "-0" : "-") + m;
	var d = date.getDate();
	strDate += (d < 10 ? "-0" : "-") + d;
	return strDate;
}

var _uiBlocked = false;
var _uiBlockedTime;

function uiBlock(msg) {
	if(!msg)
		msg = '请稍等...';
	if (!_uiBlocked) {
		_uiBlockedTime = new Date();
		_uiBlocked = true;
		$.blockUI({
			message : msg
		});
	}
}

function uiUnblock() {
	if (_uiBlocked) {
		var currTime = new Date();
		var times = new Date().getTime() - _uiBlockedTime.getTime();
		if (times < 200) {
			setTimeout(function() {
				$.unblockUI();
				_uiBlocked = false;
			}, 200 - times);
		} else {
			$.unblockUI();
			_uiBlocked = false;
		}
	}
}