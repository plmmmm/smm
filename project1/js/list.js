

function Project(){
//	console.log(1)
	this.clear = document.querySelector(".clear");
	
	this.init();
}
Project.prototype.init = function(){
	
	this.load();
	
}

//	商品页面
	Project.prototype.load = function(){
//		console.log(1)
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
//			console.log(1)
		
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
								<p><span class="iconfont icon-ban"></span>收藏</p>
							</i>
						</li>`	
			}
//			console.log(2)
			this.clear.innerHTML = str;
			$(".clear").children("li").click(function(){
					$.cookie("good",$(this).attr("goods"));
					$(location).attr('href','Details page.html')
//					console.log($(this).attr("goods"))
				})
		}

			

new Project()








