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