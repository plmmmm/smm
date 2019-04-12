
		
			window.onload = function(){
				new RotationChart();
			}
//			1.选元素
//			2.绑定点击事件
//			3.图片跟随移动
//			4.上面图片跟随切换
//			5.放大镜效果绑定进入离开事件
//			6.鼠标跟随移动
//			7.同步大图片百分比移动
			
			function RotationChart(){
				this.Details();
				
			}
			
			
			RotationChart.prototype.Details = function(){
				var that = this;
				$.ajax({
					url:"./json/goods.json",
					type:"GET",
					dataType:"json",
					success:function(res){						
						that.Display(res);					 
					}
				})
			}
//			JSON.parse($.cookie("good")).id)
			
			RotationChart.prototype.Display = function(res){
				var str = "";
				for(var i=0;i<res.length;i++){
					if(res[i].id == $.cookie("good")){
						str =`<"div id="cont">
										<div class="l_box">
											<div  class="boximg">
												<a href="#"><img src="${res[i].src}"/></a>
												<a href="#"><img src="imgs/1241039886_360x360.jpg"/></a>
												<a href="#"><img src="imgs/1323660899.jpg"/></a>
												<a href="#"><img src="imgs/1416208109.jpg"/></a>
												<a href="#"><img src="imgs/1504041424.jpg"/></a>
												<a href="#"><img src="imgs/1525961910.jpg"/></a>
												<a href="#"><img src="imgs/570213011.jpg"/></a>
												<i></i>
												<p></p>
											</div>
										</div>
											<div class="r_box">
												<a href="#"><img src="${res[i].src}"/></a>
												<a href="#"><img src="imgs/1241039886_360x360.jpg"/></a>
												<a href="#"><img src="imgs/1323660899.jpg"/></a>
												<a href="#"><img src="imgs/1416208109.jpg"/></a>
												<a href="#"><img src="imgs/1504041424.jpg"/></a>
												<a href="#"><img src="imgs/1525961910.jpg"/></a>
												<a href="#"><img src="imgs/570213011.jpg"/></a>
											</div>
											<div  class="frame">
												<div class="frameimg">
													<a href="#"><img src="${res[i].src}"/></a>
													<a href="#"><img src="imgs/1241039886_360x360.jpg"/></a>
													<a href="#"><img src="imgs/1323660899.jpg"/></a>
													<a href="#"><img src="imgs/1416208109.jpg"/></a>
													<a href="#"><img src="imgs/1504041424.jpg"/></a>
													<a href="#"><img src="imgs/1525961910.jpg"/></a>
													<a href="#"><img src="imgs/570213011.jpg"/></a>
												</div>
												<div class="but">
													<input type="button" name="" id="left" value="<<" />
													<input type="button" name="" id="right" value=">>" />
												</div>
											</div>
									
									
								<!--内容详情-->	
								
										<div id="content">
											<h3>${res[i].a4}</h3>
											<div class="content-1">
												<p>活动价：<strong>${res[i].a5}</strong>税费：商品价格已含税</p>
												<p>好评率：<span>${res[i].a6}</span>(共14条评价)</p>
											</div>
											<div class="content-2">
												<p>配      送由 |百联海外专营仓| 发货保税区发货5-10个工作日，直邮5-20个工作日</p>
												<p>服      务 由"百联海外专营" 提供发货和售后服务</p>
											</div>
											购买数量：<input type="" name="" id="" value="" />
											<div class="content-3"  index="${res[i].id}">
												<a class="page" href="shopcar.html">加入购物车</a>
												<a href="#">立即购买</a>
											</div>
											
										</div>
								
								</div>`;
					}
				}
				$("#cont").html(str);
				this.fn();
				this.addEvent();
			}
			
	
		RotationChart.prototype.addEvent = function(){	
		this.cont = document.querySelector(".content-3");
   		var that = this;
   		this.cont.addEventListener("click",function(eve){
   			if(eve.target.className == "page"){
// 				console.log(1)
   				that.id = eve.target.parentNode.getAttribute("index")
   				that.setCookie();
   			}
   		})
   	}
			
			RotationChart.prototype.setCookie = function(){
				this.goods = getCookie("goods");
				console.log(this.goods)
//				情况1:第一次添加
				if(this.goods == ""){
					this.goods = [{
						id:this.id,
						num:1
					}];
				}else{
//					情况2:不是第一次添加
					this.goods = JSON.parse(this.goods);
//					新情况1：这次点击的是老数据
					var onoff = true;
					this.goods.forEach((v)=>{
						if(v.id == this.id){
							v.num++
							onoff = false;
						}
					})
					
//					新情况2：这次点击的是新数据
					if(onoff){
						this.goods.push({
							id:this.id,
							num:1
						})
					}
				}
//				所有关于数组的操作结束之后,将数组转成字符再设置到cookie中
				setCookie("goods",JSON.stringify(this.goods))
				
			}
			
			
			
			
			
			RotationChart.prototype.fn = function(){
				this.Lbox = document.querySelector(".l_box");
				this.Lboximg = document.querySelector(".boximg");
				this.Lbox_img = document.querySelectorAll(".boximg img");
				this.LboxI = document.querySelector(".boximg i");
				this.Rbox = document.querySelector(".r_box");
				this.Rboximg =  document.querySelectorAll(".r_box img");
				this.frameimg = document.querySelector(".frameimg");
				this.butimg = document.querySelectorAll(".frameimg img");
				this.butleft = document.querySelector("#left");
				this.butright = document.querySelector("#right");
//				console.log(this.butleft)
//				this.frameimg.style.width = this.butimg.length * this.butimg[0].offsetWidth + "px";
				this.index = 0;
				this.index_1 = 0;
				this.init();
			}
			RotationChart.prototype.init = function(){
				var that = this;
				this.butleft.onclick = function(){
					that.Leftclick();
				}
				this.butright.onclick = function(){
					that.Rightclick();
				}	
				this.Lbox.onmouseover = function(){
					that.mouseover();
				}
				this.Lbox.onmouseout = function(){
					that.mouseout();
				}				
				this.click();
				
			}
			
			RotationChart.prototype.click = function(){
				for(var i=0;i<this.butimg.length;i++){
						this.butimg[i].sum = i;
						var that = this;
						
					this.butimg[i].onclick = function(){
//						console.log(that.index_1)
//						console.log(this.sum)
						that.index_1 =this.sum;
						for(var j=0;j<that.Lbox_img.length;j++){
							that.Lbox_img[j].style.display = "none"
							that.Rboximg[j].style.display = "none"
						}
							that.Lbox_img[this.sum].style.display = "block";
							that.Rboximg[this.sum].style.display = "block";
							
					}
				}
				
			}
			
			RotationChart.prototype.mouseover = function(){
				this.LboxI.style.display = "block";
				this.Rbox.style.display = "block";
				var that = this;
				this.Lbox.onmousemove = function(eve){
					var e = eve || window.event;
					that.mousemove(e);		
				}
			}
			RotationChart.prototype.mouseout = function(){
				this.LboxI.style.display = "none";
				this.Rbox.style.display = "none";
			}
			RotationChart.prototype.mousemove = function(e){
				this.l=e.offsetX - this.LboxI.offsetWidth/2;
				this.t=e.offsetY - this.LboxI.offsetHeight/2;
				this.w=this.Lbox.offsetWidth - this.LboxI.offsetWidth;
				this.h=this.Lbox.offsetHeight - this.LboxI.offsetHeight;
				
				if(this.l < 0) this.l = 0;
				if(this.t < 0) this.t = 0;
				if(this.l > this.w) this.l = this.w;
				if(this.t > this.h) this.t = this.h;
				
				this.LboxI.style.left = this.l + "px";
				this.LboxI.style.top = this.t + "px";
				
				this.x = this.l / this.w;
				this.y = this.t / this.h;
				this.display();
			}
			RotationChart.prototype.display = function(){
				this.Rboximg[this.index_1].style.left = -(this.Rboximg[this.index_1].offsetWidth - this.Rbox.offsetWidth) * this.x +"px";
				this.Rboximg[this.index_1].style.top = -(this.Rboximg[this.index_1].offsetHeight - this.Rbox.offsetHeight) * this.y +"px";
			}			
			
			RotationChart.prototype.Leftclick = function(){
				if(this.index ==0){
					this.index =0;
				}else{
					this.index++;
				}
				if(this.index_1 == 0){
					this.index_1 = 0;
				}else{					
					this.index_1--;
				}
				
				this.clickmove();
				this.Lboximgmove();
			}
			RotationChart.prototype.Rightclick = function(){
				if(this.index == -(this.butimg.length-4)){
					
					this.index = -(this.butimg.length-4);
				}else{
					this.index--;
				}
				if(this.index_1 == this.Lbox_img.length-1){
					this.index_1 = this.Lbox_img.length-1;
				}else{
					this.index_1++;					
				}
				this.clickmove();
				this.Lboximgmove();
			}
			RotationChart.prototype.clickmove = function(){
				move(this.frameimg,{left:this.index * this.butimg[0].offsetWidth})
			}
			
			RotationChart.prototype.Lboximgmove = function(){
					for(var i=0;i<this.Lbox_img.length;i++){
						this.Lbox_img[i].style.display = "none";
						this.Rboximg[i].style.display = "none";
					}
					this.Lbox_img[this.index_1].style.display = "block";
					this.Rboximg[this.index_1].style.display = "block";
			}	
			
		
		
//		关键字搜索

//		function Search(){
////			1.选元素,设置url
//			this.txt = document.getElementById("txt");
//			this.ul = document.getElementById("list");
//			this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";  //接口
////			2.绑定事件
//			this.addEvent();
//		}
//		Search.prototype.addEvent = function(){
//			var that = this;
//			this.txt.onkeyup = function(){
////				3.保存输入框的内容
//				that.val = this.value;
////				console.log(that.val)
////				4.准备请求数据
//				that.load()
//			}
//		}
//		Search.prototype.load = function(){
//			var that = this;
//			jsonp(this.url,function(res){
////				5.将数据保存到将来的实例对象
//				that.res = res;
////				console.log(that.res)
////				6.请求成功之后,才能够去渲染页面
//				that.display();
//			},{
//				_name:"cb",
//				cb:"asdasgtdsa",
//				wd:this.val
//			})
//		}
//		Search.prototype.display = function(){
////			7.渲染页面
//			var str= ""
//			this.res.s.forEach(function(v){
//				str += `<li>${v}</li>`;
//			})
//			this.ul.innerHTML = str;
////			console.log(this.ul.innerHTML)
//		}
		
//		new Search();