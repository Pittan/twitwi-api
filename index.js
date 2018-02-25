const express = require('express')
const bodyParser = require('body-parser')
const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const APP_VERSION = '1.0'

// express application
var app = express()

// add body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Crossを有効
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  next()
})

// Optionsも必要
app.options('*', (req, res) => {
  res.sendStatus(200)
})

// root
app.get('/', function(request, response) {
  response.json({
    'name': 'TwiTwi-API',
    'version': APP_VERSION
  })
})

//set routing
app.use('/statuses', require('./src/routes/statuses')({client: client}))
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
  console.log(`Node app is running at localhost: ${app.get('port')}`)
})