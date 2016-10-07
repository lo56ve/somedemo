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
	var play=false;
	outer.style.width=clientW+"px";
	inner.style.height=clientH*3-1+"px";
	outer.style.height=clientH+"px";
	content.style.width=clientW+"px";
	content.style.height=clientH+"px";
	carousel.style.height=clientH+"px";
	ul.style.height=clientH+"px";
	ul.style.width=clientW*6+"px";
	// lyricUl.style.height=lyricLi.offsetHeight*40+"px";
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

						// music.pause();
						// music.currentTime=0;
						// lyricUl.innerHTML="";
						music.innerHTML="<source src='mp3/告白气球/告白气球.mp3' type='audio/mp3'><source src='mp3/告白气球/告白气球.ogg' type='audio/ogg'>";
						var lrcURL="mp3/告白气球/告白气球";
						if(play){
							return;
						}
						// switch(i){
						// 	case 0:{
						// 		music.innerHTML="<source src='mp3/告白气球/告白气球.mp3' type='audio/mp3'><source src='mp3/告白气球/告白气球.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/告白气球/告白气球";
						// 	}
						// 	break;
						// 	case 1:{
						// 		music.innerHTML="<source src='mp3/晴天/晴天.mp3' type='audio/mp3'><source src='mp3/晴天/晴天.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/晴天/晴天";
						// 	}
						// 	break;
						// 	case 2:{
						// 		music.innerHTML="<source src='mp3/爱情废柴/爱情废柴.mp3' type='audio/mp3'><source src='mp3/爱情废柴/爱情废柴.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/爱情废柴/爱情废柴";
						// 	}
						// 	break;
						// 	case 3:{
						// 		music.innerHTML="<source src='mp3/彩虹/彩虹.mp3' type='audio/mp3'><source src='mp3/彩虹/彩虹.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/彩虹/彩虹";
						// 	}
						// 	break;
						// 	case 4:{
						// 		music.innerHTML="<source src='mp3/七里香/七里香.mp3' type='audio/mp3'><source src='mp3/七里香/七里香.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/七里香/七里香";
						// 	}
						// 	break;
						// 	case 5:{
						// 		music.innerHTML="<source src='mp3/一路向北/一路向北.mp3' type='audio/mp3'><source src='mp3/一路向北/一路向北.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/一路向北/一路向北";
						// 	}
						// 	break;
						// 	case 6:{
						// 		music.innerHTML="<source src='mp3/稻香/稻香.mp3' type='audio/mp3'><source src='mp3/稻香/稻香.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/稻香/稻香";
						// 	}
						// 	break;
						// 	case 7:{
						// 		music.innerHTML="<source src='mp3/不能说的秘密/不能说的秘密.mp3' type='audio/mp3'><source src='mp3/不能说的秘密/不能说的秘密.ogg' type='audio/ogg'>";
						// 		lrcURL="mp3/不能说的秘密/不能说的秘密";
						// 	}
						// 	break;
						// }
						music.play();
						$.ajax({
							url:lrcURL+'.txt',
							dataType:'text',
							async:'true',
							type:'GET',
							scriptCharset:'utf-8',
							success:function(data){
								var a= parseLyric(data);
								//获取页面上的audio标签
								var last=-1;
								for(var i=0,l=a.length;i<l;i++){
									lyricUl.innerHTML+="<li>"+a[i][1]+"</li>";
								}
								music.ontimeupdate=function(e){
									play=true;
									if(!lyricUl.innerHTML){
										return;
									}
									for(var i=0,l=a.length;i<l;i++){
										if(this.currentTime/*当前播放时间*/>a[i][0]){
											if(i>last){
												console.log(this.currentTime);
												lyricScroll(a);
												last=i;
											}
										}
									}
								}

							}
						})
					}
				}
			})(i)		//这里的i表示第几首歌
		}
	}
	

	//歌词滚动事件
	function lyricScroll(li){
		var lyricScrollTimer=null;
		clearInterval(lyricScrollTimer);
		lyricScrollTimer=setInterval(function(){
			lyricUl.style.top=lyricUl.offsetTop-1+"px";
			if(lyricUl.offsetTop==lyricUl.offsetHeight){
				clearInterval(lyricScrollTimer);
			}
			else if(lyricUl.offsetTop%41==0){
				clearInterval(lyricScrollTimer);
			}
			for(var i=0;i<li.length;i++){
				if((lyricLi[i].offsetTop+lyricUl.offsetTop<250) &&(lyricLi[i].offsetTop+lyricUl.offsetTop>210)){
					lyricLi[i].className="scrollLi";
				}
				else{
					lyricLi[i].className="";
				}
			}
		 },3)
	}

	//提取歌词
	function parseLyric(text) {
	    //将文本分隔成一行一行，存入数组
	    var lines = text.split('\n'),
	        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
	        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
	        //保存最终结果的数组
	        result = [];
	    //去掉不含时间的行
	    while (!pattern.test(lines[0])) {
	        lines = lines.slice(1);
	    };
	    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
	    lines[lines.length - 1].length === 0 && lines.pop();
	    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
	        //提取出时间[xx:xx.xx]
	        var time = v.match(pattern),
	            //提取歌词
	            value = v.replace(pattern, '');
	        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
	        time.forEach(function(v1, i1, a1) {
	            //去掉时间里的中括号得到xx:xx.xx
	            var t = v1.slice(1, -1).split(':');
	            //将结果压入最终数组
	            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
	        });
	    });
	    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
	    result.sort(function(a, b) {
	        return a[0] - b[0];
	    });
	    return result;
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