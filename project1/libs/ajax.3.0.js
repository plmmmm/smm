//ajax({
//	type:"get",				//可省略，默认为get
//	url:"",
//	data:{},					//可省略，默认为{}
//	success:function(){
//		
//	},
//	error:function(){
//		
//	},
//	_name:"cb"					//可省略，但是当type为jsonp时必填
//})

function ajax(options){
	let {type,url,data,success,error,_name} = options;
	type = type==undefined ? "get" : type;
	data = data==undefined ? {} : data;
	
	var str= "";
	for(var i in data){
		str = str + i + "=" + data[i] + "&";
	}
//	"user=admin&pass=123"
	if(type != "jsonp"){
		var ajax = new XMLHttpRequest();
		ajax.open(type,url);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText)
			}else if(ajax.readyState == 4 && ajax.status != 200){
				error(ajax.status)
			}
		}
	}
	
	switch(type){
		case "post":
			str = str.slice(0,str.length-1);
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send(str);
			break;
		case "get":
			var d = new Date();
			url = url + "?" + str + "_lyt="+d.getTime();
			ajax.send(null)
			break;
		case "jsonp":
			url = url + "?" + str + _name + "=" + "sakjdhsadkj";
			//通过顶层对象window,在局部环境中绑定一个全局函数
			window.sakjdhsadkj = function(res){
				success(res);
			}
			var script = document.createElement("script");
			script.src = url;
			document.body.appendChild(script);
			break;
	}
}
