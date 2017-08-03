const Blog      = require('../models/blogs')
const User      = require('../models/user')

const controller = {

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

  viewChoice(req, res) { 

    Blog.findById(req.params.id, function(error, foundBlog) {
    	if (error) {
    		console.log(error);
    	} else {
        
    		res.render('viewBlog', { blog: foundBlog });
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