if (process.env.NODE_ENV != "production") {
	require("./config/secret")
}
const express      = require('express')
const app          = express()
const bodyParser   = require('body-parser')
const morgan       = require('morgan')
const routes       = require('./routes/routes')
const blogs        = require('./routes/blogs.js');
const mongoose     = require('mongoose')
const cookieParser = require('cookie-parser')



mongoose.connect(process.env.mlab || "mongodb://localhost/auth", {
  useMongoClient: true
})	
app.use(express.static(__dirname + '/public'));
//app.use('/', express.static(__dirname + '/public'));


//App setup
// Middleware in express, any incoming request is going to be passed into morgan and bodyParser
// Morgan is a HTTP request logger middleware for node.js
// BodyParser is going to parse everything to json format


app.use(morgan('combined'))		
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', routes)
app.use('/blogs', blogs);

app.set('view engine', 'ejs')
//Server setup
//When hosting your application on another service (like Heroku, Nodejitsu, and AWS), your host may independently configure the process.env.PORT variable for you; after all, your script runs in their environment.

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
