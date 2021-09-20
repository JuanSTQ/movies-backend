const MongoLib = require("../lib/mongo")
const bcrypt = require('bcrypt')

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
  async signUp({user}){
    const format = {}
    for(const prop in user){
      if(prop!=="password"){
        format[prop] = user[prop]
      }
    }
    format.password = await bcrypt.hash(user.password, 10)
    const userCreatedID = await this.mongoLib.create(this.collection, format)
    return userCreatedID
  }
  deleteUser({id}){
    return this.mongoLib.delete(this.collection, id)
  }
   updateUser({user, id}){
    return this.mongoLib.update(this.collection, id, user)
  }
}

module.exports = Users


