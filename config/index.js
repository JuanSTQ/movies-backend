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
  defaultAdminPassword:process.env.DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword:process.env.DEFAULT_USER_PASSWORD,
  authJwtSecret:process.env.AUTH_JWT_SECRET,
  publicApiKeyToken:process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken:process.env.ADMIN_API_KEY_TOKEN,
}
module.exports = config