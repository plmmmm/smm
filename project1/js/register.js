
//		
//		1.选择元素
//		2.绑定事件
//		3.获取输入框的值,准备发送
//		4.开启ajax
//		5.找到成功状态,做对应处理
//		
		
		class Register{
			constructor(){
//				1.先准备好接口
				this.url = "http://www.icodeilife.cn/ctrl/register.php";
				
//				2.绑定事件
				this.init();
			}
			init(){
				var that = this;
				$("#btn").click(function(){
//					3.触发事件时开启ajax
					that.load()
				})
			}
			load(){
				$.ajax({
//					4.使用接口
					url:this.url,
//					7.成功之后的处理
					success:function(res){
						switch(res){
							case "0":
								$("span").html("用户名重复");break;
							case "1":
								$("span").html("注册成功，5秒后跳转到登录");
								setTimeout(()=>{
									location.href = "login.html";
								},5000)
								break;
							case "2":
								$("span").html("数据不全");break;
						}
					},
//					5.发送数据
					data:{
						tel:$("#user").val(),
						pass:$("#pass").val()
					},
//					6.发送之前loading
					beforeSend:function(){
						$("span").html("<img src='loading.gif'>")
					}
				})
			}
		}
		
		new Register;