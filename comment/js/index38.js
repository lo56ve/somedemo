window.onload=function(){
	// var close=document.getElementsByClassName('close');
	// for(var i=0;i<close.length;i++){
	// 	close[i].onclick=function(){
	// 		this.parentNode.parentNode.removeChild(this.parentNode);
	// 	}
	// }
	var list=document.getElementById('list');
	var lis=list.getElementsByTagName('li');
	for(var i=0;i<lis.length;i++){
		lis[i].onclick=function(e){
			e=e||window.event;		//在window内获取点击了哪个事件
			var el=e.srcElement;	//获取该事件的对象
			switch(el.className){
				case 'close':
					el.parentNode.parentNode.removeChild(el.parentNode);
					break;
				case 'praise':
					praise(el);
					break;
			}
		}
	}
	function praise(el){
		var praiseTotal=el.parentNode.parentNode.getElementsByClassName('praise-total')[0];
		var total=parseInt(praiseTotal.getAttribute('total'));
		var value=praiseTotal.innerHTML;
		if(parseInt(praiseTotal.getAttribute('my'))==1){
			el.innerHTML="<img src='img/comment/bg2.jpg' alt=''>赞";
			praiseTotal.setAttribute('my',0);
			total=total-1;
			praiseTotal.setAttribute('total',total);
			praiseTotal.innerHTML=(total==0)?'':total+"个人觉得很赞";
		}
		else{
			el.innerHTML="<img src='img/comment/bg3.jpg' alt=''>取消赞";
			praiseTotal.setAttribute('my',1);
			total=total+1;
			praiseTotal.setAttribute('total',total);
			praiseTotal.innerHTML=(total==1)?"我觉得很赞":"我和"+value;
		}
		praiseTotal.parentNode.style.display=(total==0)?'none':'block';
	}

}