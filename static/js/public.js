var baseUrl = "https://tek/admin";

/*
 * 获取当时时间到天
 * sureTime 为data定义的数据
 * 
 */
function getDate() {
	var d = new Date();
	d = `${d.getFullYear()}-${padNumber(d.getMonth()+1,2)}-${padNumber(d.getDate(),2)}`;
	return d
}

/*
 * 获取当时时间到秒
 * sureTime 为data定义的数据
 * 
 */
function getTime() {
	var d = new Date();
	d = `${d.getFullYear()}-${padNumber(d.getMonth()+1,2)}-${padNumber(d.getDate(),2)} ${padNumber(d.getHours(),2)}:${padNumber(d.getMinutes(),2)}:${padNumber(d.getSeconds(),2)}`;
	return d
}
/*
 * 数字补全方法
 * arr：数字
 * num:补全位数
 */
function padNumber(arr, num) {
	return arr.toString().padStart(num, '0')
}

/**
 * jq get请求方式返回数据给后台
 */
function jqGet(url, param) {
	$.get(baseUrl + url, param, function(data) { //param为参数---键值对方式
		console.log("这是请求成功的");
	});
}

/**
 * jq post请求方式返回数据给后台
 */
function jqPost(url, param) {
	$.post(baseUrl + url, param, function(data) { //param为参数---键值对方式
		console.log("这是请求成功的");
	});
}

/**
 * jq ajax请求方式返回数据给后台
 */
function jqAjax(url, param) {
	$.ajax({
		type: "post",
		dataType: "json", //
		url: baseUrl + url,
		data: param,
		success: function(data) {
			console.log("这是请求成功的");
		},
		error: function(err) {
			console.log("这是请求失败的");
		}
	});
}

/**
 * Promise请求方式返回数据给后台
 */
function getPromise(url,method, param) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open(method, baseUrl + url)
		xhr.send(param);
		xhr.addEventListener("readystatechange", function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				resolve(xhr.response)
			}
		})
	}).then((res) => {
		if(res){
			console.log("提交成功")
		}
	})
}
/*
 * 数组深拷贝
 * 
 */
var deepCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是一个对象
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    // 遍历obj,并且判断是obj的属性才拷贝
    if (obj.hasOwnProperty(key)) {
      // 判断属性值的类型，如果是对象递归调用深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}