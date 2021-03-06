window.onload = function() {
    //实例并初始化我们的hichat程序
    var hichat = new HiChat();
    hichat.init();
    hichat.login();
};

//定义我们的hichat类
var HiChat = function() {
    this.socket = null;
};

//向原型添加业务方法
HiChat.prototype = {
    init: function() {//此方法初始化程序
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        this.socket.on('connect', function() {
            //连接到服务器后，显示昵称输入框
            document.getElementById('info').textContent = 'get yourself a nickname :)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
        this.socket.on('nickExisted',function(){
            document.getElementById('info').textContent='该昵称已被注册';
        });
        this.socket.on('loginSuccess',function(){
            document.title='hichat |'+document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display="none";
            document.getElementById('messageInput').focus();
        });
        this.socket.on('system',function(nickName,userCount,type){
            var msg=nickName+(type=='login'?' join':' left');
            var p=document.createElement('p');
            that._displayNewMsg('system',msg,'red');
            //将在线人数显示到页面顶部
            document.getElementById('status').textContent=userCount+(userCount>1?' users':' user')+' online';
        });
        document.getElementById('sendBtn').addEventListener('click',function(){
            var messageInput=document.getElementById('messageInput'),
                msg=messageInput.value;
            messageInput.value='';
            messageInput.focus();
            if(msg.trim().length!=0){
                that.socket.emit('postMsg',msg);    //把消息发送到服务器
                that._displayNewMsg('me',msg,'blue'); //把自己的消息显示到自己到窗口中
            }
        },false);
        this.socket.on('newMsg',function(user,msg){
            that._displayNewMsg(user,msg);
        });
        document.getElementById('sendImage').addEventListener('change',function(){
            if(this.files.length!=0){
                //获取文件并用FIleReader进行读取
                var file=this.files[0],
                    reader=new FileReader();
                if(!reader){
                    that._displayNewMsg('system','你的浏览器不支持文件','red');
                    this.value='';
                    return;
                };
                reader.onload=function(e){
                    //读取成功，显示到页面并发送到服务器
                    this.value='';
                    that.socket.emit('img',e.target.result);
                    that._displayImage('me',e.target.result);
                }
                reader.readAsDataURL(file);
            }
        },false);
        this.socket.on('newImg',function(user,img){
            that._displayImage(user,img);
        })
    },

    login:function(){
        var that=this;
        document.getElementById('loginBtn').addEventListener('click',function(){
            var nickname=document.getElementById('nicknameInput').value;

            if(nickname.trim().length!=0){
                that.socket.emit('login',nickname);
                //注意这里的this不能用，因为this不能继承，在这个函数中的this和上面的this不一样
            }else{
                document.getElementById('nicknameInput').focus();
            }
        },false)
    },

    _displayNewMsg:function(user,msg,color){
        var container=document.getElementById('historyMsg'),
            msgToDisplay=document.createElement('p'),
            date=new Date().toTimeString().substr(0,8);
        msgToDisplay.style.color=color||'#000';
        msgToDisplay.innerHTML=user+'<span class="timespan">('+date+'):</span>'+msg;
        container.appendChild(msgToDisplay);
        container.scrollTop=container.scrollHeight;
    },

    _displayImage:function(user,imgData,color){
        var container=document.getElementById('historyMsg'),
            msgToDisplay=document.createElement('p'),
            date=new Date().toTimeString().substr(0,8);
        msgToDisplay.style.color=color||'#000';
        msgToDisplay,innerHTML=user+'<span class="timespan">('+date+'):</span><br>'+'<a href="'+imgData+'" target="_blank"><img src="'+imgData+'"/></a>';
        container.appendChild(msgToDisplay);
        container.scrollTop=container.scrollHeight;
    }

};


