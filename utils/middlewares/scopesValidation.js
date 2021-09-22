const boom = require('@hapi/boom')
const scopeValidation = (permitsRoute)=>{
  return (req,res,next)=>{
   if(!req.user){
      next(boom.unauthorized('No hay usuario autenticado'))
    }
    const {scopes} = req.user
    if(!scopes){
      next(boom.unauthorized('Sin permisos suficientes'))
    }
    if(!scopes.includes(permitsRoute)){
      next(boom.unauthorized('No tienes Permisos para hacer esta accion'))
    }
    console.log(scopes)
    console.log(permitsRoute)
    next()
  }
}

module.exports = scopeValidation