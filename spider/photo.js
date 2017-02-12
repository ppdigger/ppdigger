var https = require('https')
var cheerio = require('cheerio')
var async = require('async')
var fs = require('fs')
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/ppdigger');
var page = 8
var maxPage = 10
var list = []
var url = 'https://stocksnap.io/api/load-photos/date/desc/' + page

fetchPage(url)

function fetchPage(x) {
    startRequest(x)
}

function startRequest(x){
	https.get(x, function(res){
		var json = ''
		res.on('data', function(data){
			json += data
		})
		res.on('end', function(){
			var articlesData = filterChapter(json)
			list = list.concat(articlesData)
	        if(page < maxPage){
				page++
				url = 'https://stocksnap.io/api/load-photos/date/desc/' + page
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

function filterChapter(json){
	var json = JSON.parse(json)
	return json.results
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
	var id = x.img_id
	https.get('https://stocksnap.io/photo/' + id, function(res){
		var html = ''
		res.on('data', function(data){
			html += data
		})
		res.on('end', function(){
			var articlesData = filterContent(html, id, cb)
		})
	}).on('error', function(err){
	})
}

function filterContent(html, id, cb){
	var $ = cheerio.load(html)
	var article = $('.photo-wrap')
	var src = article.find('.img-col>img').attr('src')
	var size = article.find('.img-details>tbody>tr:nth-child(2)>td:nth-child(2)').text().split('x')
	var width = size[0]
	var height = size[1]
	var articleData = {
		src: src,
		width: width,
		height: height,
		author: mongoose.Types.ObjectId('5799be0e64b9d1982fe4faab'),
		like: 0
	}
	insertPhoto(articleData, function(err, doc){
		if(err){
			console.log('err: ', err)
			cb(err)
		} else{
			console.log('------完成 ' + id + '------')
				cb(null)
		}
	})

}

var photoScheMa = new Schema({
  src: String,
	width: Number,
	height: Number,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	like: Number
})
var Photo = db.model('Photo', photoScheMa);
var insertPhoto = function(query, cb){
	Photo.create(query, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}