var express=require('express'),
	app=express(),
	server=require('http').createServer(app),
	io=require('socket.io').listen(server),	//引入socket.io模块绑定服务器
	users=[];

app.use('/',express.static(__dirname+'/www'));

server.listen(80);

io.on('connection',function(socket){
	socket.on('login',function(nickname){
		if(users.indexOf(nickname)>-1){
			socket.emit('nickExisted');
		}else{
			socket.userIndex=users.length;
			socket.nickname=nickname;	
			//socket表示当前连接服务器的客户端
			//user是当前索引，nickname是当前的昵称
			users.push(nickname);
			socket.emit('loginSuccess');
			io.sockets.emit('system',nickname,users.length,'login');
			//向所有连接到服务器的客户端发送当前登录用户的昵称
			//添加了'login'数据表明用户是进入还是离开
		}
	})
	socket.on('disconnect',function(){
		//将断开的连接用户从users中删除
		users.splice(socket.userIndex,1);
		//通知除自己外的所有人
		socket.broadcast.emit('system',socket.nickname,users.length,'logout');
	})
	socket.on('postMsg',function(msg){
		socket.broadcast.emit('newMsg',socket.nickname,msg);
	})
	socket.on('img',function(imgData){
		socket.broadcast.emit('newImg',socket.nickname,imgData);
	})
})