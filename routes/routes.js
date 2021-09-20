const movies = require("../network/movies")
const user = require('../network/users')
const userMovies = require('../network/userMovies')
const auth = require('../network/auth')
function routes(app){
  app.use('/api/movies', movies)
  app.use('/api/users', user)
  app.use('/api/usermovies', userMovies)
  app.use('/auth', auth)
}

module.exports = routes