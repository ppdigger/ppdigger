var https = require('https')
var cheerio = require('cheerio')
var async = require('async')
var fs = require('fs')
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/ppdigger');
var page = 1
var maxPage = 1
var list = []
var url = 'https://unsplash.com/napi/feeds/home?after=87fb4030-d88c-11e6-8080-8000607b7d81'

fetchPage(url)

function fetchPage(x) {
    startRequest(x)
}

function startRequest(x){
	var options={  
	   hostname:'www.unsplash.com',  
	   port:443,  
       path: '/napi/feeds/home?after=87fb4030-d88c-11e6-8080-8000607b7d81',
	   method:'GET', 
	   headers:{   
	    'authorization':'Client-ID d69927c7ea5c770fa2ce9a2f1e3589bd896454f7068f689d8e41a25b54fa6042'
	   }  
	}  
	https.request(options, function(res){
		var json = ''
		res.on('data', function(data){
			json += data
		})
		res.on('end', function(){
			console.log(json)
			var articlesData = filterChapter(json)
			list = list.concat(articlesData)
	        if(page < maxPage){
				page++
				url = 'https://stocksnap.io/api/load-photos/date/desc/' + page
				console.log(url)
				fetchPage(url)
	        } else{
	        	console.log(list)
	        	// fetchPageTwo()
	        }
		})
	}).on('error', function(err){
		console.log('err', err)
	})
}

function filterChapter(json){
	var json = JSON.parse(json)
	return json.photos
}