
const express = require('express');
const Movies = require('../services/movies');
const router = express.Router();
const moviesService = new Movies()

router.get('/', (req,res,next)=>{
  moviesService.getMovies(req.query)
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch(error=>{
    next(error)
  })
})
router.get('/:id', (req,res,next)=>{
  const {id} = req.params
  moviesService.getMovie({id})
  .then(movie=>{
    res.status(200).json(movie)
  })
  .catch(error=>{
    next(error)
  })
})
router.post('/', (req,res,next)=>{
  const {body:movie} = req
  moviesService.createMovie({movie})
  .then(id=>{
    res.status(201).json({
      message: 'Created Movie',
      id,
    })
  })
})

router.delete('/:id', (req,res,next)=>{
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

router.put('/:id', (req,res,next)=>{
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


/* const fav = {
  id: 'IDFAV',
  userId: "Iduser", //con esta id → vamos a buscar
  movies: [
    {
      id: ObjectId(id),
    },
    {
      id: ObjectId(id),
    },
    {
      id: ObjectId(id),
    },
    {
      id: ObjectId(id),
    },
    {
      id: ObjectId(id),
    },
    {
      id: ObjectId(id),
    }
  ]
} */