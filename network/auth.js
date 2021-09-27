const express = require('express');
const passport = require('passport');
const Users = require('../services/users');
const validationData = require('../utils/middlewares/validationData');
const { schemaUser } = require('../utils/Schemas/users');
const router = express.Router();
const userService = new Users();
const jwt = require("jsonwebtoken");
const config = require('../config');
const ApiKeyToken = require('../services/apiKeyTokens');
const tokenService = new ApiKeyToken()
const boom = require("@hapi/boom")
require('../utils/strategies/basic')
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

router.post('/sign-in', (req,res,next)=>{
  const {apiKeyToken}= req.body
  if(!apiKeyToken){
    next(boom.unauthorized('ApiToken is required'))
  }
  passport.authenticate("basic", async (err, user)=>{
    try {
      if(err || !user){
        next(boom.unauthorized())
      }
      req.login(user, {session:false}, async function(error){
        if(error){
          next(error)
        }
        const {_id:id, name, email} = user
        const apiToken =  await tokenService.getApiKeyToken({token: apiKeyToken})
        if(!apiToken){
          next(boom.unauthorized("Token Undefined"))
        }
        const payload = {
          sub: id,
          name: name,
          email: email, 
          scopes: apiToken.scopes,
        }
        const jwtToken = jwt.sign(payload, config.authJwtSecret, {expiresIn:'15m'})
        res.cookie('cookie', jwtToken)
        res.status(200).json({token:jwtToken, user:{id, name, email}})
      })
    } catch (error) {
      next(error)
    }
  })(req,res,next)
})
module.exports = router
