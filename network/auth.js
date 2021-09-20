const express = require('express');
const Users = require('../services/users');
const validationData = require('../utils/middlewares/validationData');
const { schemaUser } = require('../utils/Schemas/users');
const router = express.Router();
const userService = new Users();

router.post('/sign-up', validationData(schemaUser), (req,res,next)=>{
    const {body: user} = req
    userService.signUp({user}).then(idUser=>{
      res.status(201).json({
        message: "User created",
        id: idUser
      })
    })
    .catch(error=>{
      next(error)
    })
})

module.exports = router
