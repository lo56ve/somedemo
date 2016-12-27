var exec=require('child_process').exec;
var querystring=require('querystring');
var formidable=require('formidable');
var fs=require('fs');
var util = require("util");

function start(response){
	console.log('start was called');

	//异步执行
	// exec('find/',{timeout:10000,maxBuffer:20000*1024},function(error,stdout,stderr){
	// 	response.writeHead(200,{'Content-Type':'text/plain'});
	// 	response.write(stdout);
	// 	response.end();
	// })	

	var body='<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html" charset="UTF-8">'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" method="post">'+
		'<input type="file" name="upload" multiple="multiple"/>'+
		'<input type="submit" value="提交"/>'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200,{'Content-Type':'text/html'});
	response.write(body);
	response.end();
}

function upload(response,request){
	console.log('upload was called');
	var form=new formidable.IncomingForm();
	// form.uploadDir='tmp';
	console.log('about to parse');
	form.parse(request,function(err,fields,files){
		console.log('parsing done');
		// fs.renameSync(files.upload.path,"/tmp/test.jpg");
		var readStream=fs.createReadStream(files.upload.path);
		var writeStream=fs.createWriteStream('./tmp/test.jpg');
		readStream.pipe(writeStream);

		response.writeHead(200,{'Content-Type':'text/html'});
		response.write("received:<br/>");
		response.write("<img src='/show'/>");
		response.end();
	})
}

function show(response){
	console.log('show was called');
	fs.readFile('./tmp/test.jpg','binary',function(err,file){
		if(err){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(err+'\n');
			response.end();
		}else{
			response.writeHead(200,{"Content-Type":"image/jpg"});
			response.write(file,'binary');
			response.end();
		}
	});
}

exports.start=start;
exports.upload=upload;
exports.show=show;