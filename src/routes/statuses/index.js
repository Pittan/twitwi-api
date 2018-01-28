
var express = require('express')

module.exports = function(receiveFromAppJs){
  var router = express.Router()

  // GET: /statuses/lookup
  router.get('/lookup', (request, response) => {
    lookup(receiveFromAppJs.client, request.query.id).then((tweets) => {
      response.json(tweets)
    }, (message) => {
      response.status(503).send(message)
    })
  })
  return router
}

/**
 * statuses/lookup 
 * @param {*} client Twitter client
 * @param {string} ids TweetIDs (comma separated) 
 */
function lookup (client, ids) {
  const params = {id: ids}
  return new Promise((resolve, reject) => {
    client.get('statuses/lookup', params, (error, tweets, response) => {      
      if (!error) {  
        resolve(tweets)
      } else {
        reject('Something is wrong with statuses/lookup api')
        console.error(error)
      }
    })
  })  
}