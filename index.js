const express = require('express')
const bodyParser = require('body-parser')
const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: '0muDWfAwIL4PS6SbZaSwyDePD',
  consumer_secret: 'osOz8Fe3oW4wdZgHZSXBSSSOdrDW9l6g29MuvIxdSzalikEhHs',
  access_token_key: '271272914-8XDkyYvIiD4QfaMlcCAp8rzbpV6en0pZEmB8O1NV',
  access_token_secret: 'Xry6M6yEbNC2bH1Ti7OIKdu7B3QX0lnitfgQhTKNNb3nW'
})

// express application
var app = express()

// add body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//set routing
app.use('/statuses/', (() => {
  const router = express.Router()

  // GET: /statuses/lookup
  router.get('/lookup', (request, response) => {
    console.log(request.query)
    lookup(request.query.id, (json) => {
      response.json(json)
    })
  })

  return router
})())

app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));

// app.get('/', function(request, response) {
  // response.send('Hello World!')
// });

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


function lookup (ids, callback) {
  const params = {id: ids}
  client.get('statuses/lookup', params, (error, tweets, response) => {
    if (!error) {
      // console.log(tweets)
  
      console.log(`found ${tweets.length} tweet(s)!`)
      callback(tweets)
    } else {
      console.log(error)
    }
  })
}