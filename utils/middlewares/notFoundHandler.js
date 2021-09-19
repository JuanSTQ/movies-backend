const boom = require("@hapi/boom")
const notFoundHandler = (req,res,next)=>{
  const {output:{statusCode, payload}}=boom.notFound()
  res.status(statusCode).json(payload)
}
module.exports = notFoundHandler