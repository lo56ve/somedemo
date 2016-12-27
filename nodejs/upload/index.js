var server=require('./server');
var route=require('./route');
var requestHandlers=require('./requestHandler');

var handle={};
handle['/']=requestHandlers.start;
handle['/start']=requestHandlers.start;
handle['/upload']=requestHandlers.upload;
handle['/show']=requestHandlers.show;

server.start(route.route,handle);	//调用server模块提供的接口