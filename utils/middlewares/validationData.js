const boom = require('@hapi/boom')


const validationData = (schema, prop="body")=>{
  return (req,res,next)=>{
    const {error} = schema.validate(req[prop])
    if(error){
      next(boom.badRequest("Datos ingresados incorrectos"))
    }
    next()
  }
}
module.exports = validationData