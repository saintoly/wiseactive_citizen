const Blog      = require('../models/blogs')
const User      = require('../models/user')
const Comment   = require('../models/comments')

const passportService = require('../services/passport')
const passport = require('passport')

const controller = {
  viewAllBlogs (req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {

      Blog.find({}).populate('author').sort({'created': 'descending'}).exec( (error, blogs) => {
        if (err) { return next(err) }
        if (!user) {
            return res.render('index', { blogs, user: null})
        } else {
          return res.render('index', { blogs, user})
        }
      })
    })(req, res, next)
  },

  viewCreateBlog(req, res) {
     res.render('create')
   },

  createBlog(req, res) {

  const blog = {
    blog: req.body.blog,
    author: req.user.id
  }

 	Blog.create(blog, (error, blog) =>  {
 		if (error) {
 	 		console.log(error)
 	 	} else {
      User.findById(req.user.id, (error, user) => {
        user.blogs.push(blog.id)
        user.save((error, savedUser) => {
          if (error) console.log(error)
          res.redirect('/blogs')
        })
      })
 	 	}
 	})
  },

  viewChoice (req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
      Blog.findById(req.params.id).populate('author').exec(function(error, blog) {
        if (err) { return next(err) }
        if (!user) {
            return res.render('viewBlog', { blog, user: null})
        } else {
          return res.render('viewBlog', { blog, user})
        }
      })
    })(req, res, next)
  },


    viewCommentBlog(req, res) {
     res.render('viewBlog')
   },

  commentBlog(req, res) {

  const comment = {
    comment: req.body.comment,
    author: req.params.id
  }

  Comment.create(comment, (error, comment) =>  {
    if (error) {
      console.log(error)
    } else {
      User.findById(req.params.id, (error, user) => {
        user.comments.push(comment)
        console.log(comment)
        user.save((error, savedUser) => {
          if (error) {
            console.log(error)
          } else{
          res.redirect('/blogs')
        }
    }  )
     })
    }
  })
  },


  viewUpdate(req, res) {
     
    Blog.findById(req.params.id, function(error, foundBlog) {
    	if (error) {
    		console.log(error);
    	} else {
    		res.render('update', { blog: foundBlog });
    	}
    })

},

update(req, res) {

    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, updatedBlog) {
       if(err){
        res.send(error)
       } else {
        res.redirect('/blogs')
       }
     })
},

delete(req,res) {

  Blog.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/blogs')
    }
  })

  },
  about(req, res) {
    res.render('about', {user: null, blogs: null})
  }
};

module.exports = controller;