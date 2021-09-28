const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../../config/')
const Users = require("../../services/users")
const userService = new Users()
const boom = require('@hapi/boom')
const passport = require('passport')

passport.use( new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authJwtSecret,
}, async (jwt_payload, done)=>{
  try {
    const user = await userService.getUser({email:jwt_payload.email})  
    if(!user){
      return done(boom.unauthorized("Token Erroneo"), null)
    }
    delete user.password
    done(null, {...user, scopes: jwt_payload.scopes})
  } catch (error) {
    done(error, null)
  }
}))