const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserMovies = require('../services/userMovies');
const scopeValidation = require('../utils/middlewares/scopesValidation');
const validationData = require('../utils/middlewares/validationData');
const { userMovieIdSchema, createUserMovieSchema } = require('../utils/Schemas/userMovies');

const userMoviesService = new UserMovies()
require('../utils/strategies/jwt')
router.get('/', (req,res,next)=>{
  console.log(req.headers.authorization)
  console.log(req.query)
  next()
} ,passport.authenticate('jwt', { session: false }), scopeValidation("read:user-movies"), (req,res,next)=>{
  userMoviesService.getUserMovies(req.query)
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch(error=>{
    next(error)
  })
})
router.get('/:id',  passport.authenticate('jwt', { session: false }), scopeValidation("read:user-movies"),  validationData(userMovieIdSchema,"params"),(req,res,next)=>{
  const {id} = req.params
  userMoviesService.getUserMovie({id})
  .then(movie=>{
    console.log(movie)
    res.status(200).json(movie)
  })
  .catch(error=>{
    console.log(error)
    next(error)
  })
})
router.post('/',passport.authenticate('jwt', { session: false }) ,scopeValidation("create:user-movies") ,validationData(createUserMovieSchema),(req,res,next)=>{
  const {body:userMovie} = req
  userMoviesService.createUserMovie({userMovie})
  .then(id=>{
    res.status(201).json({
      message: 'Created Movie',
      id,
    })
  })
  .catch(error=>{
    next(error)
  })
})

router.delete('/:id',passport.authenticate('jwt', { session: false }), scopeValidation("delete:user-movies"), validationData(userMovieIdSchema, "params"), (req,res,next)=>{
  userMoviesService.deleteUserMovie(req.params)
  .then(id=>{
    res.status(200).json({
      message: 'Deleted Succesfully',
      id,
    })
  })
  .catch(error=>{
    next(error)
  })
})

module.exports = router

