const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserMovies = require('../services/userMovies');
const validationData = require('../utils/middlewares/validationData');
const { userMovieIdSchema, createUserMovieSchema } = require('../utils/Schemas/userMovies');

const userMoviesService = new UserMovies()
require('../utils/strategies/jwt')
router.get('/', passport.authenticate('jwt', { session: false }), (req,res,next)=>{
  userMoviesService.getUserMovies(req.query)
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch(error=>{
    next(error)
  })
})
router.get('/:id', passport.authenticate('jwt', { session: false }),  validationData(userMovieIdSchema,"params"),(req,res,next)=>{
  const {id} = req.params
  userMoviesService.getUserMovie({id})
  .then(movie=>{
    res.status(200).json(movie)
  })
  .catch(error=>{
    next(error)
  })
})
router.post('/',passport.authenticate('jwt', { session: false }) , validationData(createUserMovieSchema),(req,res,next)=>{
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

router.delete('/:id',passport.authenticate('jwt', { session: false }) ,validationData(userMovieIdSchema, "params"), (req,res,next)=>{
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

