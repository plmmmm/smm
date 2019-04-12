

function Project(){
	this.clear = document.querySelector(".clear");
	
	this.init();
}
Project.prototype.init = function(){
	this.Banner();
	this.load();
	this.tab();
	this.Page();
}
//轮播图
	Project.prototype.Banner = function(){
		$("#nav-left").children("a").click(function() {
			console.log($(this).index())
				var index = $(this).index() + 1
				var t = $(".div" + index).offset().top
				console.log(t)
		//		console.log(index)
				$("html").animate({
					scrollTop: t
				})
		})		
	}
	
//	商品页面
	Project.prototype.load = function(){
			var that = this;
			$.ajax({
				url:"./json/goods.json",
				success:function(res){
	//				3.请求成功之后,渲染页面并创建页码
//					console.log(res);
					that.res = res;
//					console.log(that.res)
					that.display();
				},
				error:function(){
		
				}
			})
		}
		Project.prototype.display = function(){
		
	//		0 ~ 3	0	index0*num3 ~ num3*(index0+1)
	//		3 ~ 6	1	index1*num3 ~ num3*(index1+1)
	//		6 ~ 9	2	index2*num3 ~ num3*(index2+1)
		
			var str = "";
			for(var i=0;i<this.res.length;i++){
				
					str += `<li goods="${this.res[i].id}">
							<img src="${this.res[i].src}"/>
							<p>${this.res[i].a1}</p>
							<i>
								<span>${this.res[i].a2}</span>
								<p class="xx"><span class="iconfont icon-ban"></span>加进购物车</p>
							</i>
						</li>`
				
			}
			
		//商品详情页	
			
			this.clear.innerHTML = str;
			$(".clear").children("li").click(function(){
//					console.log(1);
					$.cookie("good",$(this).attr("goods"))
//					console.log($.cookie("good"))
					window.location.href = "Details page.html";
//					$(location).attr('href','Details page.html')
//					console.log($(this).attr("goods"))
				})
		},


//选项卡切换
Project.prototype.tab = function(){
	$(".cont").find("li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
//			console.log($(this).index())
			$(".box1").children("p").removeClass("active").eq($(this).index()).addClass("active");
		})
	
}

Project.prototype.Page = function(){
	
	
	
}



new Project();
//懒加载：
var aimg = document.querySelectorAll(".ljz img")
var clientH = document.documentElement.clientHeight
//console.log(aimg)
//console.log(clientH)
window.onscroll = function(){
	var t = document.documentElement.scrollTop
//	console.log(t)
	for(var i=0;i<aimg.length;i++){
//		console.log(aimg[i])
		if(clientH + t > aimg[i].offsetTop + 300){
			aimg[i].src = aimg[i].getAttribute("abc")
		}
	}
}


		function Search(){
//			1.选元素,设置url
			this.txt = document.getElementById("txt");
			this.ul = document.getElementById("list");
			this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
//			2.绑定事件
			this.addEvent();
		}
		Search.prototype.addEvent = function(){
			var that = this;
			this.txt.onkeyup = function(){
//				3.保存输入框的内容
				that.val = this.value;
//				console.log(that.val)
//				4.准备请求数据
				that.load()
			}
		}
		Search.prototype.load = function(){
			var that = this;
			jsonp(this.url,function(res){
//				5.将数据保存到将来的实例对象
				that.res = res;
//				console.log(that.res)
//				6.请求成功之后,才能够去渲染页面
				that.display();
			},{
				_name:"cb",
				cb:"asdasgtdsa",
				wd:this.val
			})
		}
		Search.prototype.display = function(){
//			7.渲染页面
			var str= ""
			this.res.s.forEach(function(v){
				str += `<li>${v}</li>`;
			})
			this.ul.innerHTML = str;
//			console.log(this.ul.innerHTML)
		}
		
		new Search()



























