const { BasicStrategy } = require("passport-http");
const Users = require("../../services/users");
const userService = new Users()
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');
const passport = require("passport");

const basicStrategy = new BasicStrategy(async (email, password, cb)=>{
  try {
    const user = await userService.getUser({email})
    if(!user){
      return cb(boom.unauthorized("Datos ingresados incorrectos"), null)
    }
    const valid = await bcrypt.compare(password, user.password)
    if(!valid){
      return cb(boom.unauthorized("Datos ingresados incorrectos"), null)
    }
    delete user.password
    return cb(null, user)
  } catch (error) {
    return cb(error, null)
  }
})
passport.use(basicStrategy)

