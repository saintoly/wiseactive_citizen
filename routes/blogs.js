const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Blog = require('../models/blogs')

const BlogsController = require('../controllers/blogs_controller')
const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { failureRedirect: '/signin', session: false })
const requireAuthHome = passport.authenticate('jwt', { failureRedirect: '/blogs', session: false })


router.get('/', BlogsController.viewAllBlogs);


router.get('/create', requireAuth, BlogsController.viewCreateBlog);
router.get('/:id', BlogsController.viewChoice);
router.get('/update/:id', BlogsController.viewUpdate);
router.get('/:id/comment', requireAuth, BlogsController.viewCommentBlog);

router.post('/:id/comment', requireAuth, BlogsController.commentBlog);
router.post('/create', requireAuth, BlogsController.createBlog);
router.post('/update/:id', BlogsController.update);
router.post('/delete/:id', BlogsController.delete);

 


 module.exports = router;