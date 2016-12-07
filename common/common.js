var http=require('http');
var querystring=require('querystring');

var contentData={
	'content':'老师，我来测试啦',
	'mid':8837
}

//将对象序列化为字符串
var postData=querystring.stringify(contentData);

//请求的头信息
var options={
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=679788f1-7a0f-44b9-ba4c-5927a7b8f5a4; imooc_isnew_ct=1458482177; loginstate=1; apsid=JkZTgyZjZiMzM5N2FhZDgzODc0YWFiNmUzNjFjNmUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzAzMTE5NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMDQ2ODY2MThAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGE0MzM3YjRiYjAwNjZmMmMxNjZjMzJhNGY5YmRhNDll7R4tWO0eLVg%3DYT; last_login_username=104686618%40qq.com; Hm_lvt_18a92c28fb52cb62b0c4192fe18c67c3=1480955605; PHPSESSID=6q838qun4i7tnqdqe5nlou4qo5; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1481015425,1481015477,1481026589,1481075977; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1481077214; jwplayer.qualityLabel=é«æ¸; imooc_isnew=2; cvde=58476d33491a2-12',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req=http.request(options,function(res){
	console.log('Status:'+res.statusCode);
	console.log('headers:'+JSON.stringify(res.headers));

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	})

	res.on('end',function(){
		console.log('评论完毕');
	})
})

req.on('error',function(e){
	console.log('Error:'+e.message);
})

//往请求中写入评论内容
req.write(postData);
req.end();