const dotenv = require('dotenv')
dotenv.config();
const config = {
  dev: true,
  port: process.env.PORT,
  host: process.env.HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName:process.env.DB_NAME,
  dbhost: process.env.DB_HOST,
}
module.exports = config