const express = require('express')
const router = express.Router()

const User = require('../models/user')

const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

// 3 arguments, next is mostly used for error handling
// first send them trough requireAuth, if they pass only then let them get to the callback function
router.get('/', (req, res) => {
  res.render('index')
})
 
//router.get('/home:id', requireAuth.private);

router.get('/signup', Authentication.newUser);
router.get('/signin', Authentication.member)
router.get('/signout', Authentication.signout);




router.post('/signup', Authentication.signup)
router.post('/signin', requireSignin, Authentication.signin)
//router.post('/signout', Authentication.signout)

module.exports = router
