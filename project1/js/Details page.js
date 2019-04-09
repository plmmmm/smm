
		
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
			
		
		