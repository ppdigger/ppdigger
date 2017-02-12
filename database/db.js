var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/ppdigger');
var Schema = mongoose.Schema;

// users
var userScheMa = new Schema({
	email: String,
	password: String,
	name: String
})
var User = db.model('User', userScheMa);
exports.authenticate = function(_query, cb){
	User.findOne(_query, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}
exports.logon = function(_query, cb){
	User.create(_query, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}

// goods
var goodScheMa = new Schema({
	title: String,
	subtitle: String,
	picture: String,
	content: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	time: String
})
var Good = db.model('Good', goodScheMa);
exports.findGoodsList = function(_query, cb){
	Good.find({}, null, {skip: _query['page']* _query['limit'], limit: parseInt(_query['limit']), sort:{ 'time': -1}})
			.populate('author', 'email name')
			.exec(function(err, doc){
			if(err){
					cb(err, null)
				} else{
					cb(null, doc)
				}
			})
}
exports.findOneGood = function(_query, cb){
	Good.findById(mongoose.Types.ObjectId(_query.id))
			.populate('author', 'email name')
			.exec(function(err, doc){
				if(err){
					cb(err, null)
				} else{
					cb(null, doc)
				}
			})
}

// photos
var photoScheMa = new Schema({
  src: String,
	width: Number,
	height: Number,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	like: Number
})
var Photo = db.model('Photo', photoScheMa);
exports.findPhotosList = function(_query, cb){
	let query
	if(_query.search == '' || _query.search == 'undefined' ){
		query = {}
	} else{
		query = { author: mongoose.Types.ObjectId(_query.search) }
	}
	console.log(query);
	Photo.find(query, null, {skip: _query['page']* _query['limit'], limit: parseInt(_query['limit']), sort:{ 'time': -1}})
						.populate('author', 'email name')
						.exec(function(err, doc){
							if(err){
								cb(err, null);
							} else{
								cb(null, doc);
							}
						})
}
exports.addPhotoLike = function(_id, cb){
	Photo.findById( mongoose.Types.ObjectId(_id), function(err, doc){
		if(err){
			cb(err, null)
		} else{
			var like = doc.like + 1
			Photo.update({ _id: _id }, { like: like }, function( err, doc ){
				if(err){
					cb(err, null)
				} else{
					cb(null, doc)
				}
			})
		}
	})
}

// blogs
var blogScheMa = new Schema({
	title: String,
	blockquote: String,
	body: String,
	createTime: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' }
})
var Blog = db.model('Blog', blogScheMa);
exports.findBlogsList = function(_query, cb){
	let query
	if(_query.search == '' || _query.search == 'undefined' ){
		query = {}
	} else{
		query = { author: mongoose.Types.ObjectId(_query.search) }
	}
	Blog.find(query, null, { skip: _query['page']* _query['limit'], limit: parseInt(_query['limit']), sort:{ 'createTime': -1 } })
			.populate('author', 'email name')
			.exec(function(err, doc){
				if(err){
					cb(err, null)
				} else{
					cb(null, doc)
				}
			})
}
exports.findOneBlog = function(_query, cb){
	Blog.findOne({ '_id': _query.id })
			.populate('author', 'email name')
			.exec(function(err, doc){
				if(err){
					cb(err, null)
				} else{
					cb(null, doc)
				}
			})
}
exports.createBlog = function(_query, cb){
	_query.author = mongoose.Types.ObjectId(_query.author)
	Blog.create(_query, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}

//comments
var commentScheMa = new Schema({
  type: String,
  articleId: Schema.Types.ObjectId,
	body: String,
	createTime: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' }
})
var Comment = db.model('Comment', commentScheMa);
exports.createComment = function(_query, cb){
  _query.articleId = mongoose.Types.ObjectId(_query.articleId)
  _query.author = mongoose.Types.ObjectId(_query.authorId)
  Comment.create(_query, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}
exports.findCommentList = function(_query, cb){
  _query.articleId = mongoose.Types.ObjectId(_query.articleId)
  Comment.find(_query)
         .populate('author', 'name')
         .exec(function(err, doc){
           if(err){
   					cb(err, null)
   				} else{
   					cb(null, doc)
   				}
         })
}

exports.findPeople = function(_query, cb){
	let obj = {
		_id: '',
		email: '',
		name: '',
		photoscount: '0',
		blogscount: '0'
	}
	User.findById(mongoose.Types.ObjectId(_query.id), 'email name', function(err, doc){
		if(err){
			cb(err, null)
		} else{
			if(doc ===null || doc.length === 0){
				cb(null, doc)
			} else{
				obj._id = doc._id
				obj.email = doc.email
				obj.name = doc.name
				Photo.count({ author: mongoose.Types.ObjectId(_query.id) }, function(err, doc){
					if(err){
						cb(err, null)
					} else{
						obj.photoscount = doc
						Blog.count({ author: mongoose.Types.ObjectId(_query.id) }, function(err, doc){
							if(err){
								cb(err, null)
							} else{
								obj.blogscount = doc
								cb(null, obj)
							}
						})
					}
				})
			}
		}
	})
}

exports.countPhotosByPeople = function(_query, cb){
	Photo.count({ author: mongoose.Types.ObjectId(_query.id) }, function(err, doc){
		if(err){
			cb(err, null)
		} else{
			cb(null, doc)
		}
	})
}
