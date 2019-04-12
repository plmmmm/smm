

//数量加减
//function add(){
//		this.init();
//	}
//	
//	add.prototype.init = function(){
//			var i = 1;
//			$(".cont").children().eq(0).on("click",function(){
//				console.log($(".cont").children("input").val())
//				if($(".cont").children("input").val() == 1){
//					$(".cont").children("input").val(1) 
//				}else{
//					$(".cont").children("input").val(--i) 
//				}
//			})
//			
//			$(".cont").children().eq(2).on("click",function(){
//				if($(".cont").children("input").val() == 10){
//					$(".cont").children("input").val(10)
//				}else{
//					$(".cont").children("input").val(++i)
//				}
//			})
//	};
//	
//	
//	new add()


		
 
 
   class shopcar{
   	constructor(options){
// 		1.解析参数
		this.shop = options.shop;
		this.url = options.url;
		this.shopul = options.shopul;
		this.shopulli = options.shopulli;
//		console.log(this.shop)
//		console.log(this.shopulli)
	
//		2.请求数据
		this.load()
		
//		5.绑定事件
		this.addEvent()
		
		
   	}
   	
   	
   	load(){
// 		console.log(1)
   		var that = this;
   		$.ajax({
   			url:this.url,
   			success:function(res){
     				that.res = res;
     				
// 				that.res = JSON.parse(res);
   				that.getCookie();
// 				console.log(that.res)
// 			3.请求数据成功后渲染页面
// 				that.display();
   			}
// 			error:function(){				
// 			}	
   		})	
   	}
   	
   	getCookie(){
// 		console.log(getCookie("goods"))
   		this.goods = JSON.parse(getCookie("goods"));
// 		console.log(this.goods)
//console.log(this.res)
//console.log(this.goods)
   		this.display();
   	}
   	
   
   	display(){
// 		4.遍历数据 拼接解构 渲染页面
//		console.log(1)
   		var str = "";
// 		比对cookie和总数据
   		for(var i=0;i<this.res.length;i++){
   			for(var j=0;j<this.goods.length;j++){
// 				console.log(this.goods.length)
   				if(this.res[i].id == this.goods[j].id){
// 					console.log(this.res[i])
		   			str += `<li good="${this.res[i].id}">
								<input type="checkbox" name="" id="" value="" />
								<img src="${this.res[i].src}"/>
								<p>${this.res[i].a1}</p>
								<span>${this.res[i].a2}</span>
							
								<div class="cont">
									<i>-</i>
									<input type="number" name="" id="" value="1" min = "1"/>
									<i>+</i>
								</div>
								<b id="del" index="${this.res[i].id}">删除</b>    
							</li>`;
   					
   				}
   			}
   		}
   		this.shopul.innerHTML = str;
   		this.addEvent()
   	}
   	
   		addEvent(){
   			var that = this;
   			this.shopul.addEventListener("click",function(eve){
   				var e = eve || window.event;
   				var target = e.target || e.srcElement;
   				if(target.id == "del"){
   					console.log(target);
   					that.id = eve.target.getAttribute("index");
//						删除DOM元素
						eve.target.parentNode.parentNode.remove();
//						6.遍历cookie,找到符合条件的数据,做删除
						that.changeCookie(function(index){
//							8.删除并再次设置回去
							that.goods.splice(index,1);
						})
   				}

   			})			
   	}
   	
   	changeCookie(callback){
//				7.找到cookie中符合条件的数据
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id == this.id){
						break;
					}
				}
				
				callback(i);
				
//				9.再设置回去
//				12.再设置回去
				setCookie("goods",JSON.stringify(this.goods))
			}
   	
   	   	 	
   	 	
   }

		new shopcar({
			shop:document.querySelector(".shop-3"),
			shopul:document.querySelector(".shop-3 ul"),
			url:"./json/goods.json"
	})










