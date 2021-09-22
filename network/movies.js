const express = require('express');
const passport = require('passport');
const Movies = require('../services/movies');
const scopeValidation = require('../utils/middlewares/scopesValidation');
const validationData = require('../utils/middlewares/validationData');
const { schemaIdMovie, schemaMovie, updateMovieSchema } = require('../utils/Schemas/movies');
const router = express.Router();
const moviesService = new Movies()
require("../utils/strategies/jwt")

router.get('/', (req,res,next)=>{
  moviesService.getMovies(req.query)
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch(error=>{
    next(error)
  })
})
router.get('/:id', validationData(schemaIdMovie, "params"), (req,res,next)=>{
  const {id} = req.params
  moviesService.getMovie({id})
  .then(movie=>{
    res.status(200).json(movie)
  })
  .catch(error=>{
    next(error)
  })
})
router.post('/', passport.authenticate('jwt', { session: false }), scopeValidation("create:movies"), validationData(schemaMovie), (req,res,next)=>{
  console.log(req.user)
  const {body:movie} = req
  moviesService.createMovie({movie})
  .then(id=>{
    res.status(201).json({
      message: 'Created Movie',
      id,
    })
  })
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), scopeValidation("delete:movies") ,validationData(schemaIdMovie, "params"), (req,res,next)=>{
  moviesService.deleteMovie(req.params)
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

router.put('/:id', passport.authenticate('jwt', { session: false }), scopeValidation("update:movies"),  validationData(schemaIdMovie, "params"), 
  validationData(updateMovieSchema),
  (req,res,next)=>{
    const {body:movie, params:{id}} = req
    console.log(id)
    moviesService.updateMovie({movie, id})
    .then(id=>{
      res.status(200).json({
        message: "Movie updated",
        id
      })
    })
    .catch(error=>{
      next(error)
    })
})
module.exports = router

