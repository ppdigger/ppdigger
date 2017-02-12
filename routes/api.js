var express = require('express');
var jwt = require("jwt-simple");
var router = express.Router();
var db = require('../database/db');
var sd = require('silly-datetime');

router.post('/goodsList', function(req, res, next){
	var _page = req.body.page,
		_limit = req.body.limit,
		_query = {page: _page, limit: _limit};
	db.findGoodsList(_query, function(err, doc){
		if(err){
			console.log('not found, and err is ', err)
			return next(err);
		} else{
			if(doc ===null || doc.length === 0){
				res.json({status:1,message:"no data",data:[]})
			} else{
				res.json({status:0,message:"",data:doc})
			}
		}
	})
})

router.post('/good', function(req, res, next){
	var _id = req.body.id,
		_query = {id: _id};
	db.findOneGood(_query, function(err, doc){
		if(err){
			console.log('not found, and err is ', err)
			return next(err);
		} else{
			if(doc ===null || doc.length === 0){
				res.json({status:1,message:"no data",data:[]})
			} else{
				res.json({status:0,message:"",data:doc})
			}
		}
	})
})

router.post('/photosList', function(req, res, next){
	var _page = req.body.page,
		_limit = req.body.limit,
		_search = req.body.search,
		_query = {page: _page, limit: _limit, search: _search};
	db.findPhotosList(_query, function(err, doc){
		if(err){
			console.log('not found, and err is ', err)
			return next(err);
		} else{
			if(doc ===null || doc.length === 0){
				res.json({status:1,message:"no data",data:[]})
			} else{
				res.json({status:0,message:"",data:doc})
			}
		}
	})
})

router.post('/addLike', function(req, res, next){
	var _id = req.body.id;
	db.addPhotoLike(_id, function(err, doc){
		if(err){
			console.log('err is ', err)
			return next(err);
		} else{
			if(doc ===null || doc.length === 0){
				res.json({status:1,message:"no data",data:[]})
			} else{
				res.json({status:0,message:"",data:doc})
			}
		}
	})
})

router.post('/authenticate', function(req, res, next){
	var _email = req.body.email,
			_password = req.body.password,
			_query = {email: _email};
	db.authenticate(_query, function(err, doc){
		if(err){
			console.log('login err is ', err)
			return next(err)
		} else{
			if(doc === null || doc.length === 0){
				res.json({status: 1, message:"email has been registered", data:[]})
			} else{
				if(_password === doc.password){
					var expires = Date.now() + 7*24*60*60*1000
					var name = doc.name
					var id = doc._id
					var token = jwt.encode({
						iss: id,
						name: name,
						exp: expires,
						aud: 'ppdigger'
					}, req.app.get('jwtTokenSecret'))
					res.json({status:0,message:"login success",data:{
						id: id,
						token: token,
						name: name,
						expires: expires
					}});
				}else{
					res.json({status:1,message:"password error",data:[]});
				}
			}
		}
	})
})

router.post('/logon', function(req, res, next){
	let _email = req.body.email,
			_password = req.body.password,
			_name = req.body.name,
			_query = {email: _email, password: _password, name: _name};
	db.authenticate({ email: _email }, function(err, doc){
		if (err) {
		  console.log('not found, and err is ', err)
		  return next(err)
		} else{
			if (doc === null || doc.length === 0) {
				db.authenticate({ name: _name }, function(err, doc){
					if(err){
						console.log('not found, and err is ', err)
						return next(err)
					} else{
						if(doc === null || doc.length === 0){
							db.logon(_query, function(err, doc){
								if(err){
									console.log('logon err is ', err)
									return next(err)
								} else{
									res.json({status:0,message:"register success",data:[]});
								}
							})
						} else{
							console.log('name has been registered');
							res.json({status:1,message:"name has been registered",data:[]});
						}
					}
				})
			} else{
				console.log('email has been registered');
				res.json({status:1,message:"email has been registered",data:[]});
			}
		}
	})

})

router.post('/checktoken', function(req, res, next){
	let _token = req.headers.authorization
	console.log(_token, req.app.get('jwtTokenSecret'))
	if(_token){
		let decoded = jwt.decode(_token, req.app.get('jwtTokenSecret'))
		if(decoded.exp <= Date.now() || decoded.aud !== 'ppdigger'){
			res.sendStatus(401)
		} else{
			res.json({status:0, message:"check success", data:{
				id: decoded.iss,
				name: decoded.name,
				token: _token
			}});
		}
	} else{
		res.sendStatus(401)
	}

})

router.post('/blogsList', function(req, res, next){
	var _page = req.body.page,
		_limit = req.body.limit,
		_search = req.body.search,
		_query = {page: _page, limit: _limit, search: _search};
	db.findBlogsList(_query, function(err, doc){
		if(err){
			console.log('not found, and err is ', err)
			return next(err);
		} else{
			if(doc ===null || doc.length === 0){
				res.json({status:1,message:"no data",data:[]})
			} else{
				res.json({status:0,message:"",data:doc})
			}
		}
	})
})

router.post('/blog', function(req, res, next){
	var _id = req.body.id,
		_query = {id: _id};
	db.findOneBlog(_query, function(err, doc){
		if(err){
			console.log('not found, and err is ', err)
			return next(err);
		} else{
			if(doc ===null || doc.length === 0){
				res.json({status:1,message:"no data",data:[]})
			} else{
				res.json({status:0,message:"",data:doc})
			}
		}
	})
})

router.post('/people', function(req, res, next){
	var _id = req.body.id,
		_query = { id: _id };
		db.findPeople(_query, function(err, doc){
			if(err){
				console.log('not found, and err is ', err)
				return next(err);
			} else{
				if(doc ===null || doc.length === 0){
					res.json({status:1,message:"no data",data:[]})
				} else{
					res.json({status:0,message:"",data:doc})
				}
			}
		})
})

router.post('/addComment', function(req, res, next){
	var _id = req.body.id,
			_type = req.body.type,
			_articleId = req.body.articleId,
			_body = req.body.body,
			_time = sd.format(new Date(), 'YYYY-MM-DD HH:mm'),
			_query = { authorId: _id, type: _type, articleId: _articleId, body: _body, createTime: _time };
			db.createComment(_query, function(err, doc){
				if(err){
					console.log('not create, and err is ', err)
					return next(err);
				} else{
					if(doc ===null || doc.length === 0){
						res.json({status:1,message:"no data",data:[]})
					} else{
						res.json({status:0,message:"",data:doc})
					}
				}
			})
})
router.post('/findComment', function(req, res, next){
	var _articleId = req.body.articleId,
			_type = req.body.type,
			_query = { type: _type, articleId: _articleId };
		db.findCommentList(_query, function(err, doc){
			if(err){
				console.log('not find, and err is ', err)
			} else{
				if(doc ===null || doc.length === 0){
					res.json({status:1,message:"no data",data:[]})
				} else{
					res.json({status:0,message:"",data:doc})
				}
			}
		})
})
router.post('/addBlog', function(req, res, next){
	var _id = req.body.id,
			_title = req.body.title,
			_blockquote = req.body.blockquote,
			_body = req.body.body,
			_time = sd.format(new Date(), 'YYYY.MM.DD HH:mm'),
			_query = { author: _id, title: _title, blockquote: _blockquote, body: _body, createTime: _time };
		db.createBlog(_query, function(err, doc){
			if(err){
				console.log('not find, and err is ', err)
			} else{
				if(doc ===null || doc.length === 0){
					res.json({status:1,message:"no data",data:[]})
				} else{
					res.json({status:0,message:"",data:doc})
				}
			}
		})
})

module.exports = router;
