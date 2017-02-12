var http = require('http')
var cheerio = require('cheerio')
var async = require('async')
var fs = require('fs')
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/ppdigger');
var page = 1
var maxPage = 1
var counter = 0
var list = []
var url = 'http://www.jianshu.com/c/NEt52a?order_by=commented_at&page=' + page

fetchPage(url)

function fetchPage(x) {
    startRequest(x)
}

function startRequest(x){
	http.get(x, function(res){
		var html = ''
		res.on('data', function(data){
			html += data
		})
		res.on('end', function(){
			var articlesData = filterChapter(html)
			list = list.concat(articlesData)
	        if(page < maxPage){
				page++
				url = 'http://www.jianshu.com/c/NEt52a?order_by=commented_at&page=' + page
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
	var articleList = $('#list-container').find('.note-list>li')
	var articlesData = []
	articleList.each(function(item){
		var article = $(this)
		var url = article.find('.title').attr('href')
		counter++
		articlesData.push('http://www.jianshu.com/' + url)
	})
	return articlesData
}

function fetchPageTwo(){
	async.eachSeries(list, function(x, cb){
		startRequestContent(x, cb)
	}, function(err){
		console.log('err: ',err)
		process.exit()	
	})
}

function startRequestContent(x, cb){
	console.log('======start')
	var idList = x.split('/')
	var id = idList[idList.length - 1]
	http.get(x, function(res){
		var html = ''
		res.setEncoding('utf8')
		res.on('data', function(data){
			html += data
		})
		res.on('end', function(){
			var articlesData = filterContent(x, id, html, cb)
		})
	}).on('error', function(err){
	})
}

function filterContent(x, id, html, cb){
	// var $ = cheerio.load(html, {decodeEntities: false})
	var $ = cheerio.load(html)
	var article = $('.article')
	var title = article.find('.title').text()
	var time = article.find('.author').find('.publish-time').text()
	var $blockquote = article.find('.show-content').find('blockquote').eq(0)
	// $blockquote.remove()
	var blockquote = $blockquote.text()
	var body = article.find('.show-content').html()
	var articleData = {
		title: title,
		createTime: time,
		blockquote: blockquote,
		author: mongoose.Types.ObjectId('5799be0e64b9d1982fe4faab'),
		body: body
	}
	insertBlog(articleData, function(err, doc){
		if(err){
			console.log('err: ', err)
			cb(err)
		} else{
			console.log('------完成 ' + id + '------')
		    // setTimeout(function(){
				cb(null)
		    // }, 5000)
		}
	})
	// fs.appendFile('./data/' + id + '.txt', JSON.stringify(articleData), 'utf-8', function (err) {
 //        if (err) {
 //            console.log(err)
 //        }
 //    });

}

var blogScheMa = new Schema({
	title: String,
	blockquote: String,
	body: String,
	createTime: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	scrateTime: String
})
var Blog = db.model('Blog', blogScheMa)
var insertBlog = function(query, cb){
	Blog.create(query, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}