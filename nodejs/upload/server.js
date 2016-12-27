var formidable=require('formidable'),
	http=require('http'),
	url=require('url'),
	util=require('util');

function start(route,handle){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log('请求：'+pathname);
		route(handle,pathname,response,request);
	}
	http.createServer(onRequest).listen(8888);
	console.log('server has starts');
}

exports.start=start;