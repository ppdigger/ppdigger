var https = require('https')
var cheerio = require('cheerio')
var async = require('async')
var fs = require('fs')
var request = require('request')
var page = 1
var maxPage = 2
var list = []
var num = 0
var url = 'https://www.seedmm.com'

fetchPage(url)

function fetchPage(x) {
    startRequest(x)
}

function startRequest(x){
	https.get(x, function(res){
		var html = ''
		res.on('data', function(data){
			html += data
		})
		res.on('end', function(){
			var articlesData = filterChapter(html)
			list = list.concat(articlesData)
	        if(page < maxPage){
				page++
				url = 'https://www.seedmm.com/page/' + page
				console.log(url)
				fetchPage(url)
	        } else{
	        	fetchPageTwo()
	        }
		})
	}).on('error', function(err){
		console.log('err', err)
	})
}

function filterChapter(html){
	var $ = cheerio.load(html)
	var articleList = $('.item')
	var articlesData = []
	articleList.each(function(){
		var article = $(this)
		var url = article.find('.movie-box').attr('href')
		articlesData.push(url)
	})
	return articlesData
}

function fetchPageTwo(){
	async.eachSeries(list, function(x, cb){
		startRequestContent(x, cb)
	}, function(err){
		console.log('err: ',err)
		// process.exit()	
	})
}

function startRequestContent(x, cb){
	console.log('======start')
	var idList = x.split('/')
	var id = idList[idList.length - 1]
	https.get(x, function(res){
		var html = ''
		res.on('data', function(data){
			html += data
		})
		res.on('end', function(){
			var articlesData = filterContent(id, html, cb)
		})
	}).on('error', function(err){
	})
}

function filterContent(id, html, cb){
	var dir = './data/seed/' + id
	fs.mkdir(dir, function(err){
		 if(err){
		  console.log(err);
		 }else{
		  console.log("creat done!");
		 }
	})
	var $ = cheerio.load(html)
	var article = $('.container')
	var picture = article.find('.bigImage').attr('href')
	var imgs = article.find('#sample-waterfall>.sample-box')
	console.log(id)
	var imgsList = []
	for(var i = 0; i < imgs.length; i++){
		imgsList.push($(imgs[i]).attr('href'))
	}
    request({ url: picture, timeout: 1000 * 3600})
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(fs.createWriteStream(dir +"/"+ (num++) + picture.substr(-4,4)));
    
    for(var i = 0; i < imgs.length; i++){
        request({ url: $(imgs[i]).attr('href'), timeout: 1000 * 3600})
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(fs.createWriteStream(dir +"/"+ (num++) + $(imgs[i]).attr('href').substr(-4,4)));
    }
    cb(null)

}
