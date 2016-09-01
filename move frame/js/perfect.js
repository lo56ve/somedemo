			function startMove(obj,json,fn){	
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					var flag = 0;
					for(var attr in json){
						if(attr=='opacity'){
							var icur = parseFloat(getClass(obj,attr))*100;	//将透明度和长度的获取方式分隔出来，透明度在除ie下是小数出现，和长度的不同,如果透明度小数后面很多位，那是因为parseFloat取小数产生的，浏览器计算器会出现偏差，（试试alert（7*100）就知道了），这时需要用Math.round将后面的parseFloat（getClass(obj,attr)）取四舍五入为整数
						}
						else{
							var icur=parseInt(getClass(obj,attr));			//将重复运用的定义为一个变量
						}
						if(json[attr]>icur){
							speed=(json[attr]-icur)/10;
						}
						else{
							speed=-(icur-json[attr])/10;
						}
						speed=speed>0?Math.ceil(speed):Math.floor(speed);	
						if(icur==json[attr]){
							flag++;
						}
						if(attr=='opacity'){
							obj.style.filter='alpha(opacity:'+icur+speed+')';		//针对透明度单独增加计算，没有px值
							obj.style.opacity=(icur+speed)/100;
						}
						else{
							obj.style[attr]=icur+speed+'px';		
						}
						if(flag==getLength(json)){
							clearInterval(obj.timer);
							if(fn){
								fn();
							}
						}
					}
				},30)
					
				}
				function getClass(obj,name){			//定义getClass函数，获取ie和ff浏览器下的css样式
					if(obj.currentStyle){
						return obj.currentStyle[name];
					}
					else{
						return getComputedStyle(obj,false)[name];
					}
				}
				function getLength(obj){
					var length = 0;
					for(var attr in obj){
						length++;
					}
					return length;
				}