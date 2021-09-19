const movies = require("../network/movies")
const user = require('../network/users')
const userMovies = require('../network/userMovies')
function routes(app){
  app.use('/api/movies', movies)
  app.use('/api/users', user)
  app.use('/api/usermovies', userMovies)
}

module.exports = routes