window.onload=function(){
	var loginin=document.getElementById('loginin');
		loginin.onclick=function(){
			show();
		}
	function show(){
		var mask=document.createElement('div');
		mask.id='mask';
		mask.style.height=document.body.scrollHeight+'px';
		mask.style.width=document.body.scrollWidth+'px';
		document.body.appendChild(mask);
		var cHeight=document.documentElement.clientHeight;
		var cHeight=window.innerHeight;
		var login=document.createElement('div');
		login.id='login';
		document.body.appendChild(login);
		login.innerHTML="<h2>欢迎登录</h2><div><input type='text' placeholder='用户名'' class='input'></div><div><input type='text' placeholder='密码' class='input'></div><div><input type='button' value='登录' class='input'></div><img src='close.png' id='close'></img>";
		var lHeight=login.offsetHeight;
		var lWidth=login.offsetWidth;
		login.style.top=cHeight/2-lHeight/2+'px';
		login.style.left=document.body.clientWidth/2-lWidth/2+'px';
		var close=document.getElementById('close');
		mask.onclick=close.onclick=function(){
			document.body.removeChild(mask);
			document.body.removeChild(login);
	}
	}
	
}