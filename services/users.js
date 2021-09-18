const MongoLib = require("../lib/mongo")


class Users{
  constructor(){
    this.mongoLib = new MongoLib()
    this.collection = "users"
  }
  async getUsers(query){
    const users = await this.mongoLib.getAll(this.collection,query);
    return users
  }
  async getUser({id}){
    const user = await this.mongoLib.get(this.collection, id)
    return user
  }
  createUser({user}){
    return this.mongoLib.create(this.collection, user)
  }
  deleteUser({id}){
    return this.mongoLib.delete(this.collection, id)
  }
   updateUser({user, id}){
    return this.mongoLib.update(this.collection, id, user)
  }
}

module.exports = Users