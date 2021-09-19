const express = require('express')
const app = express();
const config = require('./config');
const routes = require('./routes/routes');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

app.use(express.json())
routes(app)
app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)
app.listen(config.port, config.host, (err, data)=>{
  if(err){
    console.log(err)
  }
  console.log(`Escuchando en el puerto http://${config.host}:${config.port}/`)
})