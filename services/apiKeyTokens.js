const MongoLib = require("../lib/mongo")
class ApiKeyToken{
  constructor(){
    this.db = new MongoLib()
    this.collection ="api-token"
  }
  async getApiKeyToken(token){
    const apitoken = await this.db.getAll(this.collection, token)
    return apitoken[0]
  }
  async createApiKeyToken({apiKeyToken}){
    const id = await this.db.create(this.collection,apiKeyToken)
    return id
  }
}
module.exports = ApiKeyToken