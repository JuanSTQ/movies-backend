const movies = require("../network/movies")
const user = require('../network/users')
function routes(app){
  app.use('/api/movies', movies)
  app.use('/api/users', user)
}

module.exports = routes