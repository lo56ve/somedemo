window.onload=function(){
	var clientH=document.documentElement.clientHeight;
	var clientW=document.documentElement.clientWidth;
	var carousel=document.getElementById("jay_carousel");
	var ul=carousel.getElementsByTagName("ul")[0];
	var carouselImg=ul.getElementsByTagName("img");
	var single=document.getElementById("jay_single");
	var outer=document.getElementById("outer");
	var inner=document.getElementById("inner");
	var content=document.getElementById("content");
	var single=document.getElementById("jay_single");
	var scrollSingle=single.getElementsByClassName("scroll-single")[0];
	var scrollSingleA=scrollSingle.getElementsByTagName("a");
	var singleUl=single.getElementsByTagName("ul")[0];
	var singleLi=single.getElementsByTagName("li");
	var page=single.getElementsByClassName("page")[0];
	var clickLeft=page.getElementsByTagName("a")[0];
	var clickRight=page.getElementsByTagName("a")[1];
	var lyric=single.getElementsByClassName("lyric")[0];
	var lyricUl=lyric.getElementsByTagName("ul")[0];
	var lyricLi=lyric.getElementsByTagName("li");
	var special=document.getElementById("jay_special");
	var detailSpecial=document.getElementById("detail-special");
	var imgSpecial=detailSpecial.getElementsByClassName("img-special")[0];
	var introSpecial=detailSpecial.getElementsByClassName("intro-special")[0];
	var hisSpecial=document.getElementById("his-special");
	var hisSpecialLi=hisSpecial.getElementsByTagName("li");
	var music=document.getElementById("music");
	outer.style.width=clientW+"px";
	inner.style.height=clientH*3-1+"px";
	outer.style.height=clientH+"px";
	content.style.width=clientW+"px";
	content.style.height=clientH+"px";
	carousel.style.height=clientH+"px";
	ul.style.height=clientH+"px";
	ul.style.width=clientW*6+"px";
	lyricUl.style.height=lyricLi[0].offsetHeight*40+"px";
	special.style.height=clientH+"px";
	special.style.width=clientW+"px";
	for(var i=0;i<carouselImg.length;i++){
		carouselImg[i].style.width=clientW+"px";
		carouselImg[i].style.height=clientH+"px";
	}
	var timertoggle=setInterval(opacityChange,5000);
	single.style.height=clientH+"px";
	single.style.width=clientW+"px";

	var scrollTimer=null;
	//判断鼠标滚动的事件
	if(inner.offsetTop%clientH==0){
		if(window.addEventListen){
			window.addEventListen('DOMMouseScroll',wheel,false);		//火狐情况下，添加事件监听，访问wheel函数
		}
		else{
			window.onmousewheel=document.onmousewheel=wheel;			//其他浏览器，包含ie
		}
	}
	
	//鼠标滚动事件
	function wheel(event){
		var delta=0;
		if(!event){
			event=window.event;			//获取事件,ie和其余浏览器
		}
		if(event.wheelDelta){
			delta=event.wheelDelta/120;
			if(window.opera){
				delta=-delta;
			}
			else if(event.detail){
				delta=-event.detail/3;
			}
		}
		if(delta){
			handle(delta);
		}
	}

	function handle(delta){
		if(delta<0){			//向下滚动
			clearInterval(scrollTimer);
			console.log(inner.offsetHeight);
			if(Math.abs(inner.offsetTop)<inner.offsetHeight-clientH){
				scrollTimer=setInterval(function(){
					inner.style.top=inner.offsetTop-1+"px";
					if(inner.offsetTop%clientH==0){
						clearInterval(scrollTimer);
					}
				},3)
			}
		}
		else{					//向上滚动
			clearInterval(scrollTimer);
			if(inner.offsetTop<0){
				scrollTimer=setInterval(function(){
					inner.style.top=inner.offsetTop+1+"px";
					if(inner.offsetTop%clientH==0){
						clearInterval(scrollTimer);
					}
				},3)
			}
		}
	}

	function opacityChange(){
		var flag=1;			//1表示透明度在变低，0表示在变高
		var picOpacity=100;
		if(flag==1){
			var timer=setInterval(function(){
				if(flag==1){
					picOpacity-=4;
					carousel.style.opacity=picOpacity/100;
					if(picOpacity==0){
						if(ul.offsetLeft<=-6830){		//最后一张图片，跳转到第一个
							ul.style.left=0+"px";
						}
						else{
							ul.style.left=ul.offsetLeft-clientW+"px";
						}
						flag=0;
					}
				}
				if(flag==0){
					picOpacity+=4;
					carousel.style.opacity=picOpacity/100;
					if(picOpacity==100){
						clearInterval(timer);
					}
				}
			},30)
		}
	}

	//歌单分页，点击事件
	singleUl.style.width=scrollSingle.offsetWidth*3+"px";
	singleUl.style.height=singleLi[0].offsetHeight+"px";
	page.style.marginTop=singleLi[0].offsetHeight+"px";
	for(var l=0;l<singleLi.length;l++){
		singleLi[l].style.width=scrollSingle.offsetWidth+"px";
	}
	bgColor(scrollSingleA);

	var singleScrollTimer=null;
	clickRight.onclick=function(){
		clearInterval(singleScrollTimer);
		if(singleUl.offsetLeft>(-scrollSingle.offsetWidth)*2){
			singleScrollTimer=setInterval(function(){
				singleUl.style.left=singleUl.offsetLeft-1+"px";
				if(singleUl.offsetLeft%scrollSingle.offsetWidth==0){
					clearInterval(singleScrollTimer);
				}
			},3)
		}
	}
	
	clickLeft.onclick=function(){
		clearInterval(singleScrollTimer);
		if(singleUl.offsetLeft<0){
			singleScrollTimer=setInterval(function(){
				singleUl.style.left=singleUl.offsetLeft+1+"px";
				if(singleUl.offsetLeft%scrollSingle.offsetWidth==0){
					clearInterval(singleScrollTimer);
				}
			},3)
		}
	}

	//歌词滚动事件
	var lyricScrollTimer=null;
	lyric.onclick=function(){
		// clearInterval(lyricScrollTimer);
		// lyricScrollTimer=setInterval(function(){
		// 	lyricUl.style.top=lyricUl.offsetTop-1+"px";
		// 	if(lyricUl.offsetTop==lyricUl.offsetHeight){
		// 		clearInterval(lyricScrollTImer);
		// 	}
		// 	for(var i=0;i<lyricLi.length;i++){
		// 		if((lyricLi[i].offsetTop+lyricUl.offsetTop<250) &&(lyricLi[i].offsetTop+lyricUl.offsetTop>210)){
		// 			lyricLi[i].className="scrollLi";
		// 		}
		// 		else{
		// 			lyricLi[i].className="";
		// 		}
		// 	}
		//  },30)
		music.pause();
		music.currentTime=0;
	}


	//异步加载专辑的图片和介绍
	specialChange();
	bgColor(hisSpecialLi);

	detailSpecial.onclick=function(){
		if(getClass(imgSpecial,"display")=="inline"){
			imgSpecial.style.display="none";
			introSpecial.style.display="block";
		}
		else{
			imgSpecial.style.display="inline";
			introSpecial.style.display="none";
		}
		specialChange();
	}

	function specialChange(){
		if(getClass(imgSpecial,"display")=="inline"){
			introSpecial.style.display="none";
			detailSpecial.style.width="40%";
			detailSpecial.style.marginLeft="20%";
			detailSpecial.style.backgroundColor="#A4A0A0";
			detailSpecial.style.padding="10px";
		}
		else{
			introSpecial.style.display="block";
			detailSpecial.style.width="75%";
			detailSpecial.style.marginLeft="0";
			detailSpecial.style.backgroundColor="#6F6C6C";
			detailSpecial.style.padding="20px";
		}
	}

	function bgColor(obj){
		for(var i=0;i<obj.length;i++){
			(function(i){					//闭包
				obj[i].onclick=function(){
					for(var j=0;j<obj.length;j++){
						obj[j].className="";
						// imgSpecial[0].style.display="none";
						// introSpecial[0].style.display="none";
					};
					this.className="activeClass";
					if(obj==hisSpecialLi){
						$.ajax({
							url:'special.json',
							dateType:"json",
							async:true,
							type:"GET",
							success:function(data){
								imgSpecial.setAttribute("src",data[i].img);
								imgSpecial.style.display="inline";
								introSpecial.style.display="none";
								detailSpecial.style.width="40%";
								detailSpecial.style.marginLeft="20%";
								detailSpecial.style.backgroundColor="#A4A0A0";
								detailSpecial.style.padding="10px";
								introSpecial.innerHTML="<p>"+data[i].intro.replace(/\n/g,"</p><p>")+"</p>";		//将\n转换成p标签
							}
						});
					}
					if(obj==scrollSingleA && i==0){		//播放音乐
						music.play();
					}
					else if(i!=0){
						music.pause();
						music.currentTime=0;
					}
				}
			})(i)
		}
	}
	
	//获取样式
	function getClass(obj,name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else{
			return getComputedStyle(obj,false)[name];
		}
	}
	
}