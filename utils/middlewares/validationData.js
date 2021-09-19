const boom = require('@hapi/boom')


const validationData = (schema, prop="body")=>{
  return (req,res,next)=>{
    const {error} = schema.validate(req[prop])
    if(error){
      console.log("formato Incorrecto de datos")
      next(boom.badRequest("Datos ingresados incorrectos"))
    }
    console.log("formato correcto de datos")
    console.log(error)
    next()
  }
}
module.exports = validationData