const express = require('express')
const app = express();
const config = require('./config');
const routes = require('./routes/routes');

app.use(express.json())
routes(app)
app.listen(config.port, config.host, (err, data)=>{
  if(err){
    console.log(err)
  }
  console.log(`Escuchando en el puerto http://${config.host}:${config.port}/`)
})