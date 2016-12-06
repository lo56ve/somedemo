var http=require('http');
var cheerio=require('cheerio');
var url ='http://www.imooc.com/learn/507';

function filterChapters(html){
	var $ =cheerio.load(html);
	var chapterslist=[];	//页面整个章节
	var chapters=$('.chapter');		

	chapters.each(function(){
		var chapter=$(this);
		var chaptertitleDiv=chapter.find('strong');
		chaptertitleDiv.find('i').remove();
		chaptertitleDiv.find('div').remove();
		var chaptertitle=chaptertitleDiv.text().trim();		//去除多余的标签和首尾空白符
		var chapterlistdata={
			title:chaptertitle,
			video:[]
		};

		chapter.find('li').each(function(){
			var videoDiv=$(this).find('a');
			videoDiv.find('i').remove();
			videoDiv.find('button').remove();
			var videoContent=videoDiv.text().replace(/\s/g,'');		//去除空白符
			var videoId=videoDiv.attr('href').split('video/')[1];
			var video={
				id:videoId,
				content:videoContent
			}
			chapterlistdata.video.push(video);

		})
		chapterslist.push(chapterlistdata);
	})

	for(var i=0;i<chapterslist.length;i++){
		var text="【"+chapterslist[i].title+"】\n";
		for(var j=0;j<chapterslist[i].video.length;j++){
			text+="  "+chapterslist[i].video[j].id+"  "+chapterslist[i].video[j].content+"\n";
		}
		console.log(text);
	}
	
}


http.get(url,function(res){
	var html='';

	res.on('data',function(data){
		html+=data;
	});
	res.on('end',function(){
		filterChapters(html);
	})	
}).on('error',function(){
	console.log('错误');
})