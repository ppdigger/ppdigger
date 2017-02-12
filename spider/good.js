var http = require('http')
var cheerio = require('cheerio')
var async = require('async')
var fs = require('fs')
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/ppdigger');
var page = 1
var maxPage = 5
var list = []
var startId = '774468'
var url = 'http://www.ifanr.com/coolbuy?page='+page+'&pajax=1&post_id__lt=' + startId

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
			list = list.concat(articlesData.articlesData)
	        if(page < maxPage){
				page++
				url = 'http://www.ifanr.com/coolbuy?page='+page+'&pajax=1&post_id__lt=' + articlesData.lastId
				console.log(url)
				fetchPage(url)
	        } else{
	        	fetchPageTwo()
        		fs.appendFile('./data/' + 'list' + '.txt', JSON.stringify(list), 'utf-8', function (err) {
			        if (err) {
			            console.log(err)
			        }
			    });
	        }
		})
	}).on('error', function(err){
		console.log('err', err)
	})
}

function filterChapter(html){
	var $ = cheerio.load(html)
	var articleList = $('.o-matrix__row__unit').not('.o-matrix__row__unit--2x1')
	var articlesData = []
	var lastId
	articleList.each(function(item){
		var article = $(this)
		var url = article.find('.article-link').attr('href')
		var lastIdList = url.split('/')
		listId = lastIdList[lastIdList.length - 1]
		articlesData.push(url)
	})
	return {
		articlesData: articlesData,
		lastId: listId
	}
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
	var $ = cheerio.load(html)
	var article = $('.o-single-content')
	var title = article.find('.c-single-normal__title').text()
	var time = article.find('.c-article-header-meta__time').text()
	var picture = article.find('#article-header').attr('style').split("'")[1]
	var img = article.find('img')
	for(var i = 0; i < img.length; i++){
		$(img[i]).removeAttr('srcset').removeAttr('width').removeAttr('height').removeAttr('sizes')
	}
	var blockquote = article.find('article').find('blockquote')
	var subtitle = blockquote.find('p').text()
	blockquote.remove()
	var content = article.find('article').html()
	var articleData = {
		title: title,
		time: time,
		subtitle: subtitle,
		picture: picture,
		author: mongoose.Types.ObjectId('5799be0e64b9d1982fe4faab'),
		content: content
	}
	insertGood(articleData, function(err, doc){
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

var goodScheMa = new Schema({
	title: String,
	subtitle: String,
	picture: String,
	content: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	time: String
})
var Good = db.model('Good', goodScheMa)
var insertGood = function(query, cb){
	Good.create(query, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}